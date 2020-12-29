from flask import Flask
from blueprints.page import page

app=Flask(__name__)
app.config.from_object('config.settings')
app.config.from_pyfile('settings.py', silent=True)
app.register_blueprint(page)

if __name__=="__main__":
    app.run(debug=True)