<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="text-align: justify;">

  <h1 align="center">DECISION HUB</h1>

  <h2 style="text-align: left;">PROBLEM STATEMENT</h2>
  <p style="text-align: justify;">
    Decision Hub addresses the need for a comprehensive decision-making platform, focusing on rule building, rule management, and visualization.
    The project aims to provide a robust Rule Processing Engine to streamline decision processes and enhance overall efficiency.
    Develop a Rule Builder application, "DecisionHub," that empowers Business Analysts to create, save, and visualize decision strategies.
    Provide a no-code rule writing experience and visual representation to test these rules in real-time and observe the calculations at each step.
  </p>

  <p align="center">
    <img src="https://cdn.dribbble.com/users/4053518/screenshots/17442460/media/fce8c55480768b09cd279cf8d540ee43.gif" alt="Decision Hub Logo" width="200">
  </p>

  <h2 style="text-align: left;">DECISION HUB</h2>
  <ul style="text-align: justify;">
    <li>We aim to construct an advanced Decision Hub seamlessly integrating Generative AI, elevating decision-making processes.</li>
    <li>Our focus lies in creating a no-code rule-writing experience, allowing users to express business knowledge without technological barriers.</li>
    <li>The platform will offer real-time adaptability, enabling swift updates to decision strategies in response to dynamic digital needs.</li>
    <li>Harnessing the power of Generative AI, our goal is to develop dynamic decision models for enhanced accuracy and responsiveness.</li>
    <li>With a user-centric approach, our innovative tool empowers decision-makers, strategists, and analysts in navigating complex decision landscapes with agility and precision.</li>
    <li>Additionally, we strive to foster collaboration by providing collaboration features, facilitating efficient teamwork among decision-makers.</li>
    <li>Continuous improvement is at the heart of Decision Hub, ensuring that it evolves to meet the ever-changing needs of decision-makers in the digital landscape.</li>
  </ul>

  <h3 style="text-align: left;">RULE BUILDING</h3>
  <ul style="text-align: justify;">
    <li>Efficiently create and customize decision rules using an intuitive interface.</li>
    <li>Empower users to define rules that govern various aspects of decision-making without code.</li>
    <li>Enable business analysts to focus on penning down their business knowledge without technology barriers.</li>
    <li>Generate SQL queries corresponding to basic arithmetic expressions with conditional or comparison operators.</li>
  </ul>

  <h3 style="text-align: left;">RULE MANAGEMENT</h3>
  <ul style="text-align: justify;">
    <li>Centralized rule management for easy organization, modification, and versioning of decision rules.</li>
    <li>Simplify handling of complex rule sets, promoting agility and adaptability.</li>
    <li>Swiftly modify and test rules in response to dynamic real-world scenarios.</li>
  </ul>

  <h3 style="text-align: left;">VISUALIZATION</h3>
  <ul style="text-align: justify;">
    <li>Dynamic visualization tools to help users understand and analyze the impact of decision rules.</li>
    <li>Upload .csv or .excel files and choose operations like create, read, update tables.</li>
    <li>Visualize data in the form of graphs, charts, or histograms.</li>
    <li>
      Features:
      <ul style="list-style-type: none; text-align: left;">
        <li><input type="checkbox" checked disabled> Check the logic of each portion of calculations quickly.</li>
        <li><input type="checkbox" checked disabled> Run rules in real-time and double-click to identify conditions.</li>
        <li><input type="checkbox" checked disabled> Gain insights into the impact of decision rules.</li>
      </ul>
    </li>
  </ul>

  <h3 style="text-align: left;">RULE PROCESSING ENGINE</h3>
  <ul style="text-align: justify;">
    <li>A powerful rule processing engine at the core of Decision Hub.</li>
    <li>Swift and accurate execution of decision rules in real-time.</li>
    <li>Harness the power of Generative AI for dynamic decision models.</li>
    <li>Real-time adaptability for swift updates to decision strategies.</li>
  </ul>

  <h2 style="text-align: center;">KEY FEATURES</h2>
<ol style="text-align: justify; padding-left: 20px;">
  <li><strong>REVOLUTIONARY NO-CODE RULE CRAFTING</strong><br>
    Experience a paradigm shift in rule creation with the Rule Builder. Say goodbye to the need for analysts to navigate programming languages or intricate technical interfaces. Our intuitive, no-code environment empowers analysts to express their business acumen seamlessly, free from technological constraints.
  </li>
  <br>
  <li><strong>EXCELLENCE IN EXCEL-LIKE LOGIC</strong><br>
    Recognizing the familiarity of Business Analysts with tools like Excel, DecisionHub supports the creation of rules through calculator-like logic. Basic arithmetic expressions with conditional or comparison operators are effortlessly translated into rules and queries by the LLM model. Make a smooth transition with DecisionHub for analysts accustomed to widely-used platforms.
  </li>
  <br>
  <li><strong>DYNAMIC RULE ADAPTATION AND TESTING</strong><br>
    Tackle the challenge of ever-changing business rules head-on. DecisionHub empowers analysts to swiftly modify and test decision strategies in real-time. With a user-friendly interface, rules can be adjusted on-the-fly, allowing for immediate observation of calculations. Reduce errors and streamline adaptation for evolving business requirements.
  </li>
  <br>
  <li><strong>EFFORTLESS LOGIC CHECKING FOR RULES GALORE</strong><br>
    Simplify the complexity of managing thousands of rules with our application. A user-friendly mechanism facilitates rapid logic checking for each calculation. Leveraging LLM Powered Generative AI, analysts can run rules swiftly, identifying potential issues or incorrect conditions with a simple double-click. Streamline your decision strategies effortlessly.
  </li>
  <br>
  <li><strong>SEAMLESS LLM INTEGRATION</strong><br>
    Elevate your rule-building experience with seamless integration with a Large Language Model (LLM). Transform plain English text into sophisticated queries that execute seamlessly across diverse platforms, extracting valuable data from databases. Let analysts convert business insights into actionable rules without the encumbrance of technological complexities.
  </li>
</ol>

  <h2 style="text-align: left;">ARCHITECTURAL DIAGRAM</h2>
  <p align="center"><img src="https://res.cloudinary.com/dvpulu3cc/image/upload/v1702618913/ARCHITECTURE_DIAGRAM_tk8eme.png" alt="Decision Hub Architectural Diagram"></p>
  <h2 style="text-align: left;">PROTOTYPE VIDEO</h2>
  
  


https://github.com/hRJ06/Decision-Hub/assets/123245585/2b4a4551-43c2-4171-b887-a6e65d588609




  <h2 style="text-align: left;">CODE DEPLOYMENT</h2>

<h3 style="text-align: left;">SETTING UP DECISION MAKING & QUERY GENERATION</h3>
<pre><code>cd Client
npm install
npm run start
</code></pre>

<pre><code>cd Server
npm install
npm run dev
</code></pre>

<h3 style="text-align: left;">SETTING UP DATA VISUALIZATION</h3>
<pre><code>cd Visualizer
pip install -r requirements.txt
python app.py
</code></pre>


</body>
</html>
