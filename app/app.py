import flask
from flask_cors import CORS
import os

TEMPLATE_DIR = os.path.abspath('./static')
STATIC_DIR = os.path.abspath('./static')
app = flask.Flask(
    __name__,
    template_folder=TEMPLATE_DIR,
    static_folder=STATIC_DIR)
CORS(app, supports_credentials=True)

@app.route("/")
def index():
    """the home page
    """
    return flask.render_template("check1.html")



if __name__ == "__main__":
    app.run(debug=True)


