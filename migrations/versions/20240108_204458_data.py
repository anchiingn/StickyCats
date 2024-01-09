"""data

Revision ID: 028e419c88b9
Revises: 
Create Date: 2024-01-08 20:44:58.424385

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '028e419c88b9'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('firstname', sa.String(length=40), nullable=False),
    sa.Column('lastname', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('stickers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('ownerId', sa.Integer(), nullable=True),
    sa.Column('title', sa.String(length=50), nullable=True),
    sa.Column('price', sa.Float(), nullable=True),
    sa.Column('image', sa.String(), nullable=True),
    sa.Column('height', sa.Integer(), nullable=True),
    sa.Column('width', sa.Integer(), nullable=True),
    sa.Column('message', sa.String(length=300), nullable=True),
    sa.Column('shipdate', sa.Date(), nullable=True),
    sa.Column('createAt', sa.Date(), nullable=True),
    sa.Column('updateAt', sa.Date(), nullable=True),
    sa.ForeignKeyConstraint(['ownerId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('carts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=True),
    sa.Column('stickerId', sa.Integer(), nullable=True),
    sa.Column('cart', sa.Boolean(), nullable=True),
    sa.Column('quantity', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['stickerId'], ['stickers.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('favorites',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=True),
    sa.Column('stickerId', sa.Integer(), nullable=True),
    sa.Column('favorite', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['stickerId'], ['stickers.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=True),
    sa.Column('stickerId', sa.Integer(), nullable=True),
    sa.Column('review', sa.String(length=100), nullable=True),
    sa.Column('star', sa.Integer(), nullable=True),
    sa.Column('createAt', sa.Date(), nullable=True),
    sa.Column('updateAt', sa.Date(), nullable=True),
    sa.ForeignKeyConstraint(['stickerId'], ['stickers.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE stickers SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE carts SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE favorites SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE reviews SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('reviews')
    op.drop_table('favorites')
    op.drop_table('carts')
    op.drop_table('stickers')
    op.drop_table('users')
    # ### end Alembic commands ###