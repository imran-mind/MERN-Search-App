# **Search API - README**

## **1. Use Cases**

### **1.1 E-commerce**
   - Search products by name, category, and description.

### **1.2 Blog Search**
   - Search through blog titles, tags, and content.

### **1.3 Phonebook Search**
   - Find contacts by name.

### **1.4 Customer Feedback Analysis**
   - Search for specific complaints or sentiments in customer reviews.

---

## **2. Backend**

### **2.1 Create Search API**
- **Method:** `GET`
- **URI:** `/api/v1/search?query="react"`

---

## **3. Database Setup**

### **3.1 Create `articles` Collection & Ingest Blog Data**
   - Store blog articles and related metadata.

### **3.2 Create Text Search Index**
   - MongoDB text search index for fast searching.

```json
{
  "mappings": {
    "dynamic": false,
    "fields": {
      "productName": [
        {
          "maxGrams": 15,
          "minGrams": 2,
          "tokenization": "edgeGram",
          "type": "autocomplete"
        }
      ]
    }
  }
}
```

---

## **4. Explanation of Index Configuration**

### **4.1 Type: "autocomplete"**
   - Enables an **autocomplete index**, which helps in searching as the user types.

### **4.2 Tokenization: "edgeGram"**
   - Breaks input text into **small prefix tokens** (substrings).
   - Example:
     - Searching for **"Laptop"** will tokenize into:
       ```json
       ["L", "La", "Lap", "Lapt", "Lapto", "Laptop"]
       ```
   - This improves the efficiency of **autocomplete searches**.

### **4.3 minGrams: 2**
   - The **smallest token** generated will have at least **2 characters**.
   - Example:
     ```json
     "Laptop" → ["La", "Lap", "Lapt", ...]
     ```
   - This prevents inefficient single-character searches.

### **4.4 maxGrams: 15**
   - The **largest token** generated will have at most **15 characters**.
   - This prevents very large tokens that could slow down searches.

---

## **5. How to Use the API**

1. **Start the server**
   ```bash
   npm start
   ```

2. **Make a search request**
   ```bash
   curl -X GET "http://localhost:8080/api/v1/search?query=react"
   ```

3. **Example Response**
   ```json
   {
     "results": [
       {
         "_id": "123",
         "productName": "React Mastery Course",
         "description": "Learn React from scratch with hands-on projects."
       }
     ]
   }
   ```

---

## **6. Future Enhancements**
- Support **fuzzy searching** to handle typos.
- Add **category-based filtering**.
- Improve search ranking using **weights and scoring mechanisms**.

---

**Author:** _Your Name_

**Last Updated:** _Date_

