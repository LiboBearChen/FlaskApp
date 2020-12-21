from flask import Flask, render_template,request,redirect
from datetime import datetime
from flask_migrate import Migrate
from sqlalchemy import Table, Column, Integer, ForeignKey,Date,String,Text
from sqlalchemy.orm import relationship
from flask_sqlalchemy import SQLAlchemy



app=Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///posts.db'
db = SQLAlchemy(app)
migrate = Migrate(app, db)

#database tables
class Post(db.Model):
    __tablename__ = 'post'
    id=Column(Integer,primary_key=True)
    date_posted=Column(Date,nullable=False,default=datetime.utcnow)
    title=Column(String(100),nullable=False)
    link=Column(Text,nullable=True)
    tags=relationship("Tag")
    content=Column(Text,nullable=False)
    def __repr__(self):
        return 'Blog Post '+str(self.id)

class Tag(db.Model):
    __tablename__ = 'tag'
    id=Column(Integer,primary_key=True)
    name=Column(String(100),nullable=True)
    post_id = Column(Integer, ForeignKey('post.id'))
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

@app.route('/posts',methods=['GET','POST'])
def posts():
    if request.method=='POST':
        post_title=request.form['title']
        post_link=request.form['link']
        post_tag=Tag(name=request.form['tags'])
        post_tags=[post_tag]
        post_content=request.form['content']
        
        new_post= Post(title=post_title,content=post_content,link=post_link,tags=post_tags)
        db.session.add(new_post)
        db.session.commit()
        return redirect('/posts')
    else:
        all_posts=Post.query.order_by(Post.date_posted).all()
        return render_template('posts.html',posts=all_posts)

@app.route('/posts/delete/<int:id>')
def delete(id):
    post=Post.query.get_or_404(id)
    db.session.delete(post)
    db.session.commit()
    return redirect('/posts')

@app.route('/posts/edit/<int:id>',methods=['GET','POST'])
def edit(id):
    post=Post.query.get_or_404(id)
    if request.method=='POST':
        post.title=request.form['title']
        post.link=request.form['link']

        

        post_tag=Tag(name=request.form['tags'])
        post_tags=[post_tag]
        post.tags=post_tags
        post.content=request.form['content']
        
        db.session.commit()
        return redirect('/posts')
    else:
        return render_template('edit.html',post=post)

@app.route('/home/users/<string:name>/posts/<int:id>')
def hello(name,id):
    return "Hello, "+name+", your id is: "+str(id)


@app.route('/posts/new')
def new_post():
    return render_template('new_post.html')

if __name__=="__main__":
    app.run(debug=True)