from flask import render_template,request,redirect, url_for,Blueprint
from blueprints.post.models import db,Post,Tag

page = Blueprint('page', __name__, template_folder='templates')

#app routes
@page.route('/')
def index():
    return render_template('page/index.html')

@page.route('/contacts')
def contacts():
    return render_template('page/contacts.html')

@page.route('/stacks')
def stacks():
    return render_template('page/stacks.html')

@page.route('/projects/<int:id>')
def projects(id):
    return render_template('page/projects.html')

@page.route('/posts/<int:tag_id>',methods=['GET','POST'])
def posts(tag_id):
    if request.method=='POST':
        post_title=request.form['title']
        post_link=request.form['link']
        #get tags from a string
        post_tagsString=request.form['tags']
        tagsList=post_tagsString.split(',')
        post_tags=[]
        for tag in tagsList:
            postTag=Tag.get_unique(tag)
            post_tags.append(postTag)
        post_content=request.form['content']
        new_post= Post(title=post_title,content=post_content,link=post_link,tags=post_tags,tagsString=post_tagsString)
        db.session.add(new_post)
        db.session.commit()
        return redirect('/posts/0')
    else:
        if tag_id==0:
            all_posts=Post.query.order_by(Post.date_posted).all()
        else:
            all_posts = Post.query.join(post_tag).join(Tag).filter((post_tag.c.tag_id == tag_id)).all()
        all_tags=Tag.query.order_by(Tag.name).all()
        return render_template('page/posts.html',posts=all_posts,tags=all_tags,tag_id=tag_id)

@page.route('/posts/delete/<int:post_id>/<int:tag_id>')
def delete(post_id,tag_id):
    post=Post.query.get_or_404(post_id)
    #store tags used by the post after deleted
    associate_tags  = Tag.query.join(post_tag).join(Post).filter((post_tag.c.post_id == post_id)).all()
    db.session.delete(post)
    db.session.commit()
    #delete tags that are no longer used by any post
    for tag in associate_tags :
        remain_tag=Tag.query.join(post_tag).join(Post).filter((post_tag.c.tag_id == tag.id)).first()
        if remain_tag is None: 
            db.session.delete(tag)
    db.session.commit()
    return redirect(url_for('posts',tag_id = tag_id))

@page.route('/posts/edit/<int:post_id>/<int:tag_id>',methods=['GET','POST'])
def edit(post_id,tag_id):
    post=Post.query.get_or_404(post_id)
    if request.method=='POST':
        post.title=request.form['title']
        post.link=request.form['link']
        #get tags from a string
        post.tagsString=request.form['tags']
        tagsList=post.tagsString.split(',')
        post.tags.clear()
        for tag in tagsList:
            post_tag=Tag.get_unique(tag)
            post.tags.append(post_tag)
        post.content=request.form['content']
        db.session.commit()
        return redirect(url_for('posts',tag_id = tag_id))
    else:
        return render_template('page/edit.html',post=post,tag_id=tag_id)

@page.route('/posts/new')
def new_post():
    return render_template('page/new_post.html')

