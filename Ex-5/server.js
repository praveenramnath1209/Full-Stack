const http = require("http");
const fs = require("fs");
const querystring = require("querystring");

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    fs.readFile("index.html", (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end("Error loading page");
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else if (req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const parsedData = querystring.parse(body);

      const height = parseFloat(parsedData.height);
      const weight = parseFloat(parsedData.weight);

      const heightInMeter = height / 100;
      const bmi = (weight / (heightInMeter * heightInMeter)).toFixed(2);

      let category = "";
      let badgeClass = "";

      if (bmi < 18.5) {
        category = "Underweight";
        badgeClass = "bg-info";
      } else if (bmi < 24.9) {
        category = "Normal Weight";
        badgeClass = "bg-success";
      } else if (bmi < 29.9) {
        category = "Overweight";
        badgeClass = "bg-warning text-dark";
      } else {
        category = "Obese";
        badgeClass = "bg-danger";
      }

      res.writeHead(200, { "Content-Type": "text/html" });

      res.end(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
          <title>BMI Result</title>
        </head>
        <body class="bg-light">

          <div class="container d-flex justify-content-center align-items-center vh-100">
            <div class="card shadow-sm p-4 text-center" style="width: 400px; border-radius: 12px;">
              
              <h4 class="mb-3">BMI Result</h4>
              <h2 class="mb-3">${bmi}</h2>

              <span class="badge ${badgeClass} p-2 fs-6">
                ${category}
              </span>

              <div class="mt-4">
                <a href="/" class="btn btn-outline-primary">
                  Calculate Again
                </a>
              </div>

            </div>
          </div>

        </body>
        </html>
      `);
    });
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
