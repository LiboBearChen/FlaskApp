from flask import Flask, render_template,request,redirect, url_for
from datetime import datetime
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy



app=Flask(__name__,
            template_folder="templates"

)
app.config.from_object('config.settings')
app.config.from_pyfile('settings.py', silent=True)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

#database tables
post_tag = db.Table('post_tag',
    db.Column('tag_id', db.Integer, db.ForeignKey('tag.id')),
    db.Column('post_id', db.Integer, db.ForeignKey('post.id'))
)

class Post(db.Model):
    __tablename__ = 'post'
    id=db.Column(db.Integer,primary_key=True)
    date_posted=db.Column(db.Date,nullable=False,default=datetime.utcnow)
    title=db.Column(db.String(100),nullable=True)
    link=db.Column(db.Text,nullable=True)
    tagsString=db.Column(db.String(200),nullable=True)
    tags = db.relationship('Tag', secondary=post_tag, backref=db.backref('posts', lazy='joined'))
    content=db.Column(db.Text,nullable=True)
    def __repr__(self):
        return 'Blog Post '+str(self.id)

class Tag(db.Model):
    __tablename__ = 'tag'
    id=db.Column(db.Integer,primary_key=True)
    name=db.Column(db.String(100),nullable=True,unique=True)

    @classmethod
    def get_unique(cls, name):
        #check committed data in database
        tag = db.session.query(cls).filter_by(name=name).first()
        if tag is None:
            tag = cls(name=name)
            return tag
        return tag
    
    def __repr__(self):
        return 'Tag '+str(self.id)


#app routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/contacts')
def contacts():
    return render_template('contacts.html')

@app.route('/stacks')
def stacks():
    return render_template('stacks.html')

@app.route('/projects/<int:id>')
def projects(id):
    return render_template('projects.html')

@app.route('/posts/<int:tag_id>',methods=['GET','POST'])
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
        return render_template('posts.html',posts=all_posts,tags=all_tags,tag_id=tag_id)

@app.route('/posts/delete/<int:post_id>/<int:tag_id>')
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

@app.route('/posts/edit/<int:post_id>/<int:tag_id>',methods=['GET','POST'])
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
        return render_template('edit.html',post=post,tag_id=tag_id)

@app.route('/home/users/<string:name>/posts/<int:id>')
def hello(name,id):
    return "Hello, "+name+", your id is: "+str(id)


@app.route('/posts/new')
def new_post():
    return render_template('new_post.html')

if __name__=="__main__":
    app.run(debug=True)