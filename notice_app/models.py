from app import db

# 공지사항 저장을 위한 db table
class Notice(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    
    #상단 field는 저장될 attribute값들