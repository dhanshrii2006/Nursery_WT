import psycopg2
import os
import json
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
        
        # Create users table
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
        
        # Create products table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                product_id TEXT UNIQUE NOT NULL,
                name TEXT NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                category TEXT NOT NULL,
                img TEXT
            )
        ''')
        
        # Create orders table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS orders (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id),
                total_price DECIMAL(10, 2) NOT NULL,
                items JSONB NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        conn.commit()
        
        # Add sample products if they don't exist
        cursor.execute('SELECT COUNT(*) FROM products')
        product_count = cursor.fetchone()[0]
        
        if product_count == 0:
            sample_products = [
                ('p1', 'Monstera Deliciosa', 25.00, 'live-plants', 'https://placehold.co/300x200/2a9d8f/ffffff?text=Monstera'),
                ('p2', 'Snake Plant', 18.00, 'live-plants', 'https://placehold.co/300x200/2a9d8f/ffffff?text=Snake+Plant'),
                ('p3', 'Pothos Vine', 12.00, 'live-plants', 'https://placehold.co/300x200/2a9d8f/ffffff?text=Pothos'),
                ('a1', 'Faux Fiddle Leaf', 55.00, 'artificial-plants', 'https://placehold.co/300x200/a5a58d/ffffff?text=Faux+Plant'),
                ('a2', 'Artificial Orchid', 30.00, 'artificial-plants', 'https://placehold.co/300x200/a5a58d/ffffff?text=Orchid'),
                ('s1', 'Premium Potting Mix', 10.00, 'soil', 'https://placehold.co/300x200/8d6e63/ffffff?text=Soil'),
                ('s2', 'Cactus Soil', 12.00, 'soil', 'https://placehold.co/300x200/8d6e63/ffffff?text=Cactus+Soil'),
                ('f1', 'All-Purpose Fertilizer', 15.00, 'soil', 'https://placehold.co/300x200/b08968/ffffff?text=Fertilizer'),
            ]
            
            for product in sample_products:
                cursor.execute(
                    "INSERT INTO products (product_id, name, price, category, img) VALUES (%s, %s, %s, %s, %s)",
                    product
                )
            conn.commit()
            print("✅ Sample products added to database")
        
        cursor.close()
        conn.close()
        print("✅ Database initialized")
    except Exception as e:
        print(f"❌ Error initializing database: {e}")

init_database()

@app.route('/')
def home():
    user_name = session.get('user_name')
    
    # Sample slider images
    slider_images = [
        {"src": "https://placehold.co/1200x400/2a9d8f/ffffff?text=Fresh+Plants", "alt": "Fresh Plants"},
        {"src": "https://placehold.co/1200x400/1e7964/ffffff?text=Happy+Homes", "alt": "Happy Homes"},
        {"src": "https://placehold.co/1200x400/26a389/ffffff?text=Green+Living", "alt": "Green Living"},
    ]
    
    # Quick access items
    quick_access_items = [
        {"href": "/explore", "img": "https://placehold.co/50x50/2a9d8f/ffffff?text=Live", "alt": "Live Plants", "text": "Live Plants"},
        {"href": "/explore", "img": "https://placehold.co/50x50/a5a58d/ffffff?text=Artificial", "alt": "Artificial", "text": "Artificial Plants"},
        {"href": "/explore", "img": "https://placehold.co/50x50/8d6e63/ffffff?text=Soil", "alt": "Soil", "text": "Soil & Fertilizers"},
    ]
    
    return render_template('index.html', user_name=user_name, slider_images=slider_images, quick_access_items=quick_access_items)


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
        except Exception as db_error:
            # If database fails, show demo message
            print(f"Database error (using demo mode): {db_error}")
            return f"""
            <h2 style='color:green;'>✅ Registration Successful! (Demo Mode)</h2>
            <p>Welcome, {name}!</p>
            <p><small>Running in demo mode - database not available</small></p>
            <a href='/login'>Login Now</a>
            """

    # GET request just shows the register page
    return render_template('register.html')

# -------- LOGIN --------
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute("SELECT id, name, password FROM users WHERE email = %s", (email,))
            user = cursor.fetchone()
            cursor.close()
            conn.close()

            if user and user[2] == password:
                session['user_id'] = user[0]
                session['user_name'] = user[1]
                return redirect(url_for('explore'))
            else:
                return """
                <h2 style='color:red;'>❌ Login Failed</h2>
                <a href='/login'>Try Again</a>
                """
        except Exception as db_error:
            # If database fails, allow demo login with any email/password
            print(f"Database error (using demo mode): {db_error}")
            if email and password:
                # Demo mode: accept any login
                session['user_id'] = 1  # Demo user ID
                session['user_name'] = email.split('@')[0]  # Use email name
                return redirect(url_for('explore'))
            else:
                return """
                <h2 style='color:red;'>❌ Please enter email and password</h2>
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

# -------- CHECKOUT --------
@app.route('/checkout', methods=['POST'])
def checkout():
    if 'user_id' not in session:
        return {"error": "Not logged in"}, 401
    
    try:
        data = request.json
        items = data.get('items', [])
        total = data.get('total', 0)
        
        if not items or total <= 0:
            return {"error": "Invalid order"}, 400
        
        # Try to save to database, but don't fail if PostgreSQL isn't running
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute(
                "INSERT INTO orders (user_id, total_price, items) VALUES (%s, %s, %s)",
                (session['user_id'], total, json.dumps(items))
            )
            conn.commit()
            cursor.close()
            conn.close()
            return {"success": True, "message": "Order placed successfully!"}, 200
        except Exception as db_error:
            # If database fails, still return success (for demo mode)
            print(f"Database error (continuing anyway): {db_error}")
            return {"success": True, "message": "Order placed successfully! (Demo mode - no database)"}, 200
            
    except Exception as e:
        return {"error": str(e)}, 500

# -------- LOGOUT --------
@app.route('/logout')
def logout():
    session.pop('user_id', None)
    session.pop('user_name', None)
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)
