"""Initial migration.

Revision ID: f516cfd88ba3
Revises: 
Create Date: 2020-12-17 20:00:40.515911

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f516cfd88ba3'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('blog_post', sa.Column('link', sa.Text(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('blog_post', 'link')
    # ### end Alembic commands ###
