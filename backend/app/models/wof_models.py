from app import db
from sqlalchemy.dialects import postgresql

class Wheeloflife(db.Model):
    __tablename__ = 'wheeloflife'
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, index=True)
    blocks = db.Column(postgresql.ARRAY(db.String))
    data = db.Column(postgresql.ARRAY(db.Integer))

    def to_json(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "blocks": self.blocks,
            "data": self.data
        }
