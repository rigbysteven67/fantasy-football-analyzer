import os

# Heroku check
is_heroku = False
if 'IS_HEROKU' in os.environ:
    is_heroku = True

# Flask
from flask import Flask, request, render_template, jsonify

# SQL Alchemy
import sqlalchemy
from sqlalchemy import create_engine

# PyMySQL
import pymysql

# Pandas
import pandas as pd

# JSON
import json

# bootstrap
#from flask_bootstrap import Bootstrap

# Import your config file(s) and variable(s)
if is_heroku == True:
    # if IS_HEROKU is found in the environment variables, then use the rest
    # NOTE: you still need to set up the IS_HEROKU environment variable on Heroku (it is not there by default)
    remote_db_endpoint = os.environ.get('remote_db_endpoint')
    remote_db_port = os.environ.get('remote_db_port')
    remote_db_name = os.environ.get('remote_db_name')
    remote_db_user = os.environ.get('remote_db_user')
    remote_db_pwd = os.environ.get('remote_db_pwd')
else:
    # use the config.py file if IS_HEROKU is not detected
    from config import remote_db_endpoint, remote_db_port, remote_db_name, remote_db_user, remote_db_pwd

# Configure MySQL connection and connect 
pymysql.install_as_MySQLdb()
engine = create_engine(f"mysql://{remote_db_user}:{remote_db_pwd}@{remote_db_endpoint}:{remote_db_port}/{remote_db_name}")

# Initialize Flask application
app = Flask(__name__)

# Set up your default route
@app.route('/')
def home():
    return render_template('index.html')

# Set up the leaderboard table route
@app.route('/leaderboard')
def leaderboard_table():
    return render_template('leaderboard.html')

# Set up the position comparison table route
@app.route('/position-comparison')
def position_comparison():
    return render_template('position_comparison.html')

# Set up the player comparison table route
@app.route('/player-comparison')
def player_comparison():
    return render_template('player_comparison.html')

# Set up the machine learning route
@app.route('/machine-learning')
def machine_learning():
    return render_template('machine_learning.html')

# Set up the team info route
@app.route('/team-info')
def team_info():
    return render_template('team_info.html')

# set up the fantasy route
@app.route('/api/leaderboard')
def leaderboard():

    # Establish DB connection
    conn = engine.connect()
    
    query = '''
        SELECT
	        *
        FROM
            leaderboard
        '''
    
    leaderboard_data = pd.read_sql(query, con=conn)
    leaderboard_json = leaderboard_data.to_json(orient='records')

    conn.close()
    return leaderboard_json

# set up the fantasy route
@app.route('/api/data_table')
def everything_table():

    # Establish DB connection
    conn = engine.connect()
    
    query = '''
        SELECT
	        *
        FROM
            everything_table
        '''
    
    everything_table_data = pd.read_sql(query, con=conn)
    everything_table_json = everything_table_data.to_json(orient='records')

    conn.close()
    return everything_table_json


# set up the position rank route
@app.route('/api/pos_rank')
def pos_rank():

    # Establish DB connection
    conn = engine.connect()
    
    query = '''
        SELECT
	        *
        FROM
            pos_rank
        '''
    
    pos_rank_data = pd.read_sql(query, con=conn)
    pos_rank_json = pos_rank_data.to_json(orient='records')

    conn.close()
    return pos_rank_json 


# set up the position fpts over time route
@app.route('/api/FPTS_over_seasons')
def FPTS_over_seasons():

    # Establish DB connection
    conn = engine.connect()
    
    query = '''
        SELECT
	        *
        FROM
            FPTS_over_seasons
        '''
    
    FPTS_over_seasons_data = pd.read_sql(query, con=conn)
    FPTS_over_seasons_json = FPTS_over_seasons_data.to_json(orient='records')

    conn.close()
    return FPTS_over_seasons_json 


# set up the position fpts over time route
@app.route('/api/num_of_pos_over_over_seasons')
def num_of_pos_over_over_seasons():

    # Establish DB connection
    conn = engine.connect()
    
    query = '''
        select 
            *
        from
            num_of_pos_over_over_seasons
        '''
    
    num_of_pos_over_over_seasons_data = pd.read_sql(query, con=conn)
    num_of_pos_over_over_seasons_json = num_of_pos_over_over_seasons_data.to_json(orient='records')

    conn.close()
    return num_of_pos_over_over_seasons_json 


if __name__ == "__main__":
    app.run(debug=True)