"""4. migration.

Revision ID: 835dcb15379d
Revises: a54f962decf4
Create Date: 2020-12-20 19:37:45.345316

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '835dcb15379d'
down_revision = 'a54f962decf4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('posts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('date_posted', sa.Date(), nullable=False),
    sa.Column('title', sa.String(length=100), nullable=False),
    sa.Column('link', sa.Text(), nullable=True),
    sa.Column('content', sa.Text(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tags',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=True),
    sa.Column('link', sa.String(length=1000), nullable=True),
    sa.Column('post_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['post_id'], ['posts.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('tag')
    op.drop_table('blog_post')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('blog_post',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('title', sa.VARCHAR(length=100), nullable=False),
    sa.Column('content', sa.TEXT(), nullable=False),
    sa.Column('author', sa.VARCHAR(length=20), nullable=False),
    sa.Column('date_posted', sa.DATETIME(), nullable=False),
    sa.Column('link', sa.TEXT(), nullable=True),
    sa.Column('tags', sa.TEXT(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tag',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('name', sa.VARCHAR(length=100), nullable=False),
    sa.Column('link', sa.VARCHAR(length=1000), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('tags')
    op.drop_table('posts')
    # ### end Alembic commands ###