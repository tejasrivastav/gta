from app import db
from sqlalchemy.dialects import postgresql

class Content(db.Model):
    __tablename__ = 'content'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    description = db.Column(db.Text)
    content_type = db.Column(db.String)
    focus_area = db.Column(db.String)
    redirection_url = db.Column(db.String)
    ready = db.Column(db.Integer)
    img_thumbnail = db.Column(db.String)
    estimated_time = db.Column(db.Integer)

    def to_json(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "content_type": self.content_type,
            "focus_area": self.focus_area,
            "redirection_url": self.redirection_url,
            "ready": self.ready,
            "img_thumbnail": self.img_thumbnail,
            "estimated_time": self.estimated_time
        }
