# TODO App - Two-Tier Architecture (Node.js + MySQL)

This project is a simple two-tier TODO application built with:

- **Frontend/Backend:** Node.js + Express (single container)
- **Database:** MySQL
- **Containerized with Docker**
- **Deployed using Kubernetes with Deployment,StatefulSet,Secrets,ConfigMap,Service**

---


## 1. Clone Project

    git clone https://github.com/anuragkhapke-2401/ToDo-Node-App.git

<img width="1650" height="199" alt="Screenshot from 2025-08-03 20-58-40" src="https://github.com/user-attachments/assets/3ba93be9-b428-42ed-9bab-bbfd629b5db0" />


## Dockerization

### 2. Build Docker Image

    cd ToDo-Node-App

    docker build -t anuragkhapke2402/todo-app-two-tire:latest .

    docker login

    docker push anuragkhapke2402/todo-app-two-tire:latest

<img width="1853" height="1008" alt="Screenshot from 2025-08-03 21-37-02" src="https://github.com/user-attachments/assets/e1d81f82-f05f-4014-acab-55765cc77b8b" />


## Deployment On K8s

### 3. Create a ConfigMap to initialize the MySQL database with the required tables.

    cd ToDo-Node-App 

    kubectl create configmap mysql-initdb --from-file=init.sql

<img width="1650" height="155" alt="Screenshot from 2025-08-03 20-59-44" src="https://github.com/user-attachments/assets/7f9390c0-3c17-4ad2-982e-4e5319c52328" />

##  4. Encode your database password in Base64 format.

     echo -n "Anurag1234" | base64

**copy and paste Base64 format into mysql-secret.yaml**

### 5. Create a StatefulSet and Secrets And Service for MySQL, then verify the MySQL tables and databases.

     cd K8s 

     ls

     kubectl apply -f mysql-secret.yaml

     kubectl get secrets

<img width="1650" height="190" alt="Screenshot from 2025-08-03 21-00-48" src="https://github.com/user-attachments/assets/bfeedeb0-ef2f-4e86-b76f-5fe55c39feb2" />

     kubectl apply -f mysql-statefulSet.yaml

     kubectl get statefulsets.apps

<img width="1650" height="190" alt="Screenshot from 2025-08-03 21-02-12" src="https://github.com/user-attachments/assets/6a936af0-2b1c-4259-ad5e-dd43b37b5105" />

     kubectl get pods

     kubectl exec -it mysql-0 -- bash

then login into mysql using command **mysql -u root -p**  and enter password and verify the MySQL tables and databases

<img width="1650" height="900" alt="Screenshot from 2025-08-03 21-03-48" src="https://github.com/user-attachments/assets/c4af4a35-7ff9-4973-a578-8d05d06bc3fd" />

     kubectl apply -f mysql-service.yaml

     kubectl get svc

<img width="1650" height="202" alt="Screenshot from 2025-08-03 21-04-43" src="https://github.com/user-attachments/assets/5169d719-aafa-4d6f-933b-2ea982c6573d" />

## 6. Create frontend Deployment, Secret, and Service.

**For Backend Encode your database password , username , dbname in Base64 format**

      echo -n "Anurag1234" | base64

      echo -n "root" | base64

      echo -n "todo_db" | base64

**copy and paste Base64 format into todo-app-secret.yaml**

      kubectl apply -f todo-app-secret.yaml

      kubectl get secrets

<img width="1650" height="202" alt="Screenshot from 2025-08-03 21-05-31" src="https://github.com/user-attachments/assets/a9a2c15d-1df7-4b17-9324-68017385ba5d" />

      kubectl apply -d todo-app-deployment.yaml

      kubectl get deployments.apps

<img width="1650" height="202" alt="Screenshot from 2025-08-03 21-08-03" src="https://github.com/user-attachments/assets/6610e5c6-3468-4eb6-8201-0de1a8d827b8" />

      kubectl apply -f todo-app-service.yaml

      kubectl get svc

<img width="1650" height="202" alt="Screenshot from 2025-08-03 21-08-41" src="https://github.com/user-attachments/assets/03268539-4417-49d4-9b9f-d346bea346f3" />

      kubectl get all

<img width="1650" height="367" alt="Screenshot from 2025-08-03 21-09-15" src="https://github.com/user-attachments/assets/508e3a47-deac-49b2-8442-5a3b9c4f5be6" />


**If you're using AWS EC2, ensure that the NodePort range (30000–32767) is open in the instance's security group. This will allow you to access your TODO app via HTTP at http://<public_ip_of_your_node>:<node_port> from your browser.**

<img width="1847" height="1008" alt="Screenshot from 2025-08-03 21-14-49" src="https://github.com/user-attachments/assets/42b4b128-9675-4f15-9312-9e58d62ec1a2" />

**Once again, exec into your MySQL pod and verify whether the values are being inserted correctly.**

<img width="1650" height="630" alt="Screenshot from 2025-08-03 21-13-03" src="https://github.com/user-attachments/assets/56c84839-514a-47d9-92f5-301cf99f8a02" />


