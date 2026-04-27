# ASSIGNMENT 2: DATABASE SYSTEMS

## General Requirements
* **DBMS:** MS SQL Server or MySQL.
* **Note on Grading:** * If the implementation does not match Assignment 1 (BTL1), the maximum score is **70%**.
    * Implementing only basic CRUD will result in a maximum score of **70%**.
    * Bonus points are awarded for successfully answering questions during the presentation.

---

## 1. Table Creation and Sample Data (3 Points)

### 1.1 Table Implementation (2 points)
* Write SQL statements to implement **ALL** designed data tables.
* Include Primary Keys, Foreign Keys, data constraints, and semantic constraints from Assignment 1.
* Use `CHECK` constraints or `TRIGGER`.
* **Constraint Rule:** If a constraint can be handled by a `CHECK` clause during table creation, do **not** use a trigger.

### 1.2 Sample Data (1 point)
* Create meaningful sample data for all tables.
* Minimum of **5 rows per table** (via UI or SQL scripts).

---

## 2. Triggers, Stored Procedures, and Functions (4 Points)

### 2.1 CRUD Stored Procedures (1 point)
Write stored procedures for **INSERT**, **UPDATE**, and **DELETE** for **ONE** specific table.
* **Validation:** Must validate data to ensure constraints. Output meaningful, specific error messages (e.g., "Age > 18", "Invalid email format"). Do not use generic messages like "Data entry error!".
* **Delete Logic:** Define clearly when data can/cannot be deleted and the specific purpose of the deletion.

### 2.2 Triggers (1 point)
* **2.2.1 Business Rule Trigger:**
    * State one business constraint requiring a trigger.
    * Identify DML operations (INSERT/UPDATE/DELETE) that could violate this constraint.
    * Write the trigger(s) to enforce the rule.
    * **Note:** Do not use a trigger if a `CHECK` constraint is sufficient.
* **2.2.2 Derived Attribute Trigger:**
    * Select one derived attribute and write a trigger to calculate its value.
    * Identify DML operations that change this attribute.
    * Write the trigger(s) to update the value.
    * **Note:** If Trigger A uses the value of derived attribute B, B must be calculated first.
* **Requirement:** Prepare SQL and data to demonstrate triggers during the report.

### 2.3 Search Stored Procedures (1 point)
Write **two** stored procedures containing queries to display data. Parameters must be used in `WHERE` and/or `HAVING` clauses:
* **Proc 1:** Query from 2+ tables with `WHERE` and `ORDER BY`.
* **Proc 2:** Query from 2+ tables with Aggregate Functions, `GROUP BY`, `HAVING`, `WHERE`, and `ORDER BY`.
* **Requirement:** At least one procedure must relate to the table used in section 2.1. Prepare demonstration data.

### 2.4 Functions (1 point)
Write **two** functions meeting these criteria:
* Use `IF` and/or `LOOP` for logic.
* Use **Cursors**.
* Use query statements to retrieve data for calculation/validation.
* Include input parameters and input validation.
* **Requirement:** Prepare SQL and data to demonstrate functions during the report.

---

## 3. Application Implementation (3 Points)
Develop a program (Web, Mobile, or Desktop) that connects to the database.

### 3.1 CRUD Interface (1 point)
Implement one screen to perform **Insert/Update/Delete** functions using the procedures from section 2.1.

### 3.2 List Management Interface (1 point)
Implement an interface to display data by calling procedures from section 2.3 (related to the table in 2.1).
* Allow updating and deleting directly from the list.
* Include: Search, Sort, Input Validation, and logical error handling.
* Ensure clear error notifications and a user-friendly layout.

### 3.3 Advanced Interface (1 point)
Implement an interface to demonstrate at least one other procedure from 2.3 or a function from 2.4. (Can be merged with 3.2 if using the same table).

---

## General Notes
* **Individual Contribution:** Every student **MUST** write at least one object in Section 2 (Trigger, Function, or Procedure). Failure to do so results in 0 points for the assignment.
* **SQL Complexity:** Points are awarded based on complexity, completeness, and business relevance.
* **Application Logic:** * Search/Filter must call procedures with parameters from UI controls.
    * CRUD operations **MUST** call the stored procedures from section 2.1.
    * The app **MUST** connect to the database from Section 1.

### Penalty Points
* Identical or nearly identical functions/procedures/triggers.
* Insufficient or meaningless sample data.
* Members unable to explain the meaning/logic of any code (even if written by others).
* Members failing to perform tasks requested by the instructor.
* Failure of the group to report non-contributing members.