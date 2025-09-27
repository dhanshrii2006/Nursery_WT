from flask import Flask, render_template, request, redirect, url_for, session, send_from_directory
import sqlite3
import os

app = Flask(__name__)
app.secret_key = '1234567890'  # Needed for session management


# Routes to serve static files
# @app.route('/styles.css')
# def serve_css():
    # return send_from_directory('.', 'styles.css')
# 
# @app.route('/img/<filename>')
# def serve_images(filename):
    # return send_from_directory('img', filename)
# 
@app.route('/templates/<filename>')
def serve_templates(filename):
    return send_from_directory('templates', filename)





def init_database():
    """Initialize the database and create tables if they don't exist"""
    try:
        connection = sqlite3.connect('database.db')
        cursor = connection.cursor()

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                phone TEXT,
                address TEXT,
                password TEXT NOT NULL
            )
        ''')

        connection.commit()
        connection.close()
        print("Database and users table created successfully!")
    except Exception as e:
        print(f"Error initializing database: {e}")

# Initialize database when the app starts
init_database()

@app.route('/')
def home():
    # Check if user is logged in and serve appropriate content
    if 'user_id' in session:
        return f"<h1>Welcome back, {session['user_name']}!</h1> <p><a href='/logout'>Logout</a> | <a href='/'>Go to Main Site</a></p>"
    else:
      
        return render_template('index.html')
        try:
            with open('index.html', 'r', encoding='utf-8') as f:
                return f.read()
        except FileNotFoundError:
            return "<h1>Welcome to the Nursery App!</h1> <p><a href='/register'>Register</a> | <a href='/login'>Login</a></p>"

# Route to display the registration form
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        # Get form data
        name = request.form['name']
        email = request.form['email']
        phone = request.form['phone']
        address = request.form['address']
        password = request.form['password']

        # Connect to database and insert user
        try:
            conn = sqlite3.connect('database.db')
            cursor = conn.cursor()
            cursor.execute(
                "INSERT INTO users (name, email, phone, address, password) VALUES (?, ?, ?, ?, ?)",
                 (request.form['name'], request.form['email'], request.form['phone'], request.form['address'], request.form['password'])
            )
            conn.commit()
            conn.close()
            return """
            <div style='text-align: center; padding: 50px; font-family: Arial, sans-serif;'>
                <h2 style='color: green;'>✅ Registration Successful!</h2>
                <p>Welcome to RESCUE99 Nursery, {}!</p>
                <p><a href='/login' style='background: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;'>Login Now</a></p>
                <p><a href='/' style='color: #333;'>← Back to Home</a></p>
            </div>
            """.format(name)
        except sqlite3.IntegrityError:
            # This will catch if the email already exists (due to UNIQUE constraint)
            return """
            <div style='text-align: center; padding: 50px; font-family: Arial, sans-serif;'>
                <h2 style='color: red;'>❌ Registration Failed</h2>
                <p>This email is already registered. Please try a different one.</p>
                <p><a href='/register' style='background: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;'>Try Again</a></p>
                <p><a href='/' style='color: #333;'>← Back to Home</a></p>
            </div>
            """

    # If it's a GET request, just show the form
    return render_template('register.html')



@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        conn = sqlite3.connect('database.db')
        cursor = conn.cursor()
        cursor.execute("SELECT id, name, password FROM users WHERE email = ? ", (email,))
        user = cursor.fetchone()
        conn.close()

        if user and user[2] == password:
            session['user_id'] = user[0]
            session['user_name'] = user[1]
            return """
            <div style='text-align: center; padding: 50px; font-family: Arial, sans-serif;'>
                <h2 style='color: green;'>🎉 Welcome back, {}!</h2>
                <p>You have successfully logged in.</p>
                <p><a href='/' style='background: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;'>Go to Home</a></p>
                <p><a href='/logout' style='color: #333;'>Logout</a></p>
            </div>
            """.format(user[1])
        else:
            return """
            <div style='text-align: center; padding: 50px; font-family: Arial, sans-serif;'>
                <h2 style='color: red;'>❌ Login Failed</h2>
                <p>Invalid email or password. Please try again.</p>
                <p><a href='/login' style='background: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;'>Try Again</a></p>
                <p><a href='/register' style='color: #333;'>Don't have an account? Register here</a></p>
            </div>
            """

    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    session.pop('user_name', None)
    return """
    <div style='text-align: center; padding: 50px; font-family: Arial, sans-serif;'>
        <h2 style='color: #4CAF50;'>👋 Goodbye!</h2>
        <p>You have been successfully logged out.</p>
        <p><a href='/' style='background: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;'>Back to Home</a></p>
    </div>
    """

if __name__ == '__main__':
    app.run(debug=True)

    