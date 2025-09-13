from flask import Flask, request, render_template_string
import sqlite3

app = Flask(__name__)

@app.route("/")
def home():
    with open("register.html") as f:
        return f.read()

@app.route("/register", methods=["POST"])
def register():
    username = request.form["username"]
    first = request.form["first"]
    last = request.form["last"]
    email = request.form["email"]
    password = request.form["password"]
    mobile = request.form["mobile"]

    conn = sqlite3.connect("users.db")
    cur = conn.cursor()
    try:
        cur.execute("INSERT INTO register (username, first, last, email, password, mobile) VALUES (?, ?, ?, ?, ?, ?)",
                    (username, first, last, email, password, mobile))
        conn.commit()
        message = "Registration successful!"
    except sqlite3.IntegrityError as e:
        message = f"Error: {e}"
    finally:
        conn.close()

    return f"<h3>{message}</h3><a href='/'>Go Back</a>"

if __name__ == "__main__":
    app.run(debug=True)
