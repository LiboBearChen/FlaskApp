"""empty message

Revision ID: 97efa3d440d9
Revises: 24fcc375707f
Create Date: 2020-12-22 19:10:18.511817

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '97efa3d440d9'
down_revision = '24fcc375707f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint(None, 'tag', ['name'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'tag', type_='unique')
    # ### end Alembic commands ###