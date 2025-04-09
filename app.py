from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

grade_map = {
    "AA": 4.0,
    "BA": 3.5,
    "BB": 3.0,
    "CB": 2.5,
    "CC": 2.0,
    "DC": 1.5,
    "DD": 1.0,
    "FF": 0.0
}

@app.route('/calculate', methods=['POST'])
def calculate_weighted_average():
    data = request.get_json()
    items = data.get("grades", [])

    if not items:
        return jsonify({"average": 0.0})

    total_points = 0
    total_credits = 0

    for item in items:
        grade = item["grade"]
        credit = item["credit"]
        point = grade_map.get(grade, 0.0)
        total_points += point * credit
        total_credits += credit

    if total_credits == 0:
        return jsonify({"average": 0.0})

    avg = total_points / total_credits
    return jsonify({"average": round(avg, 2)})

if __name__ == '__main__':
    app.run(debug=True)