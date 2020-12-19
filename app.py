from flask import Flask, render_template,request,redirect
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_migrate import Migrate


app=Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///posts.db'
db=SQLAlchemy(app)
migrate = Migrate(app, db)

class BlogPost(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    date_posted=db.Column(db.DateTime,nullable=False,default=datetime.utcnow)

    title=db.Column(db.String(100),nullable=False)
    content=db.Column(db.Text,nullable=False)
    author=db.Column(db.String(20),nullable=False,default='N/A')
    link=db.Column(db.Text,nullable=True)

    def __repr__(self):
        return 'Blog Post '+str(self.id)

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
        post_author=request.form['author']
        post_content=request.form['content']
        post_link=request.form['link']
        new_post= BlogPost(title=post_title,content=post_content,author=post_author,link=post_link)
        db.session.add(new_post)
        db.session.commit()
        return redirect('/posts')
    else:
        all_posts=BlogPost.query.order_by(BlogPost.date_posted).all()
        return render_template('posts.html',posts=all_posts)

@app.route('/posts/delete/<int:id>')
def delete(id):
    post=BlogPost.query.get_or_404(id)
    db.session.delete(post)
    db.session.commit()
    return redirect('/posts')

@app.route('/posts/edit/<int:id>',methods=['GET','POST'])
def edit(id):
    post=BlogPost.query.get_or_404(id)
    if request.method=='POST':
        post.title=request.form['title']
        post.author=request.form['author']
        post.content=request.form['content']
        post.link=request.form['link']
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