import psycopg2
import os
from flask import Flask, render_template, request, session, redirect, url_for
from dotenv import load_dotenv

# Load .env file
load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY", "default_secret")

DATABASE_URL = os.getenv("DATABASE_URL")

def get_db_connection():
    return psycopg2.connect(DATABASE_URL)

# Initialize DB
def init_database():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                phone TEXT,
                address TEXT,
                password TEXT NOT NULL
            )
        ''')
        conn.commit()
        cursor.close()
        conn.close()
        print("✅ Database initialized")
    except Exception as e:
        print(f"❌ Error initializing database: {e}")

init_database()

@app.route('/')
def home():
    user_name = session.get('user_name')  # None if not logged in
    # Pass user_name to index.html
    return render_template('index.html', user_name=user_name)


# -------- REGISTER --------
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        phone = request.form['phone']
        address = request.form['address']
        password = request.form['password']

        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute(
                "INSERT INTO users (name, email, phone, address, password) VALUES (%s, %s, %s, %s, %s)",
                (name, email, phone, address, password)
            )
            conn.commit()
            cursor.close()
            conn.close()
            return f"""
            <h2 style='color:green;'>✅ Registration Successful!</h2>
            <p>Welcome, {name}!</p>
            <a href='/login'>Login Now</a>
            """
        except psycopg2.errors.UniqueViolation:
            return """
            <h2 style='color:red;'>❌ Email already registered</h2>
            <a href='/register'>Try Again</a>
            """
        except Exception as e:
            return f"<h2 style='color:red;'>Error: {e}</h2>"

    # GET request just shows the register page
    return render_template('register.html')

# -------- LOGIN --------
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT id, name, password FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()
        cursor.close()
        conn.close()

        if user and user[2] == password:
            session['user_id'] = user[0]
            session['user_name'] = user[1]
            # ✅ Redirect to the explore page on successful login
            return redirect(url_for('explore'))
        else:
            return """
            <h2 style='color:red;'>❌ Login Failed</h2>
            <a href='/login'>Try Again</a>
            """

    # GET request just shows the login page
    return render_template('login.html')

# -------- NEW EXPLORE ROUTE --------
@app.route('/explore')
def explore():
    # Protect this route: if 'user_id' is not in session, redirect to login
    if 'user_id' not in session:
        return redirect(url_for('login'))
        
    # User is logged in, get their name and show the explore page
    user_name = session.get('user_name')
    return render_template('explore.html', user_name=user_name)

# -------- LOGOUT --------
@app.route('/logout')
def logout():
    session.pop('user_id', None)
    session.pop('user_name', None)
    return """
    <h2 style='color:blue;'>👋 Logged out successfully</h2>
    <a href='/'>Back to Home</a>
    """

if __name__ == '__main__':
    app.run(debug=True)
