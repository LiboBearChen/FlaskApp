from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from datetime import datetime
from blog.app import app
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

