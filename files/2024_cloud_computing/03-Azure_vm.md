# Assignment: Introduction to Azure Virtual Machines

#### **Objective**
This assignment is designed to introduce you to Azure Virtual Machines, covering the setup, configuration, and basic management of VMs. By the end of this assignment, you will understand how to deploy, access, and manage VMs on Microsoft Azure.

---

### **Task 1: Create an Azure VM**

1. **Log in to Azure Portal**
   - Log in to the [Azure Portal](https://portal.azure.com/).

2. **Create a New Virtual Machine**
   - Navigate to the **Virtual Machines** service.
   - Click **+ Create** and select **Virtual Machine**.

3. **Configure the VM Settings**
   - **Subscription**: Use the default subscription.
   - **Resource Group**: Create a new resource group named `RG-AzureVM-Assignment`.
   - **VM Name**: Use a unique name, such as `StudentVM-{your initials}`.
   - **Region**: Choose a region close to you (for example, `France Central`).
   - **Zone**: Choose `Zone 3`.
   - **Image**: Select `Ubuntu Server 20.04 LTS`.
   - **Size**: Choose a size like `Standard B1s` (to minimize cost).
   - **Authentication type**: Use SSH public key or password, depending on your preference.
   - **Inbound Port Rules**: Allow SSH (port 22) and HTTP (80) to connect.

4. **Create and Deploy the VM**
   - Review the settings and click **Review + Create**.
   - After validation, click **Create** to deploy the VM.
   - Download the SSH key.

5. **Document Your VM Configuration**
   - Record the following details for submission:
     - VM name
     - Resource group
     - Region
     - Size
     - OS image

---

### **Task 2: Connect to the Azure VM**

1. **Access the VM**
   - Connect using SSH to your deployed VM. Follow the procedure in the section `Connect -> Native SSH`. You need the previously downloaded key.
   - All the information related to ssh connectivity are in the Portal.

2. **Basic Commands**
   - Run the following commands on your VM and note the output:
     - `uname -a`: Check the operating system version.
     - `df -h`: Check disk space usage.
     - `free -m`: Check memory usage.
     - `ping google.com`: Verify internet connectivity.

---

### **Task 3: Configure the VM**

1. **Install Apache (Linux)**
   - For Linux (Ubuntu), run:
     ```bash
     sudo apt update
     sudo apt install apache2 -y
     ```

2. **Verify Web Server Installation**
   - Open your browser and navigate to `http://<Your-VM-Public-IP>`.
   - You should see the default Apache welcome page.

---

### Task 3: Install Docker on the VM
1. **Install Docker**
   - Run the following commands to install Docker on Ubuntu:
   ```bash
   sudo apt update
   sudo apt install -y docker.io
   sudo systemctl start docker
   sudo systemctl enable docker
   ```
   - Add your user to the Docker group to avoid needing sudo for Docker commands:
   ```bash
   sudo usermod -aG docker $USER
   ```
   - Log out and log back in for the group change to take effect.

2. **Verify Docker Installation**
   - Run `docker --version` to confirm Docker is installed.

---
### **Task 4: Deploy a FastAPI Application Using Docker**

1. **Create a Simple FastAPI App**
   - Create a new directory for your FastAPI app:
     ```bash
     mkdir ~/fastapi-app
     cd ~/fastapi-app
     ```
   - Create a file named `main.py` with the following FastAPI code:
     ```python
     from fastapi import FastAPI

     app = FastAPI()

     @app.get("/")
     async def root():
         return {"message": "Hello, Azure!"}
     ```

2. **Create a Dockerfile for the FastAPI App**
   - In the `fastapi-app` directory, create a file named `Dockerfile` with the following content:
     ```Dockerfile
     # Use an official Python runtime as a parent image
     FROM python:3.9

     # Set the working directory
     WORKDIR /app

     # Copy the current directory contents into the container at /app
     COPY . /app

     # Install FastAPI and Uvicorn
     RUN pip install fastapi uvicorn

     # Make port 3000 available to the world outside this container
     EXPOSE 3000

     # Run app with Uvicorn on container startup
     CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "3000"]
     ```

3. **Build and Run the Docker Container**
   - Build the Docker image:
     ```bash
     docker build -t fastapi-app .
     ```
   - Run the Docker container:
     ```bash
     docker run -d -p 3000:3000 fastapi-app
     ```

4. **Test the FastAPI Application**
   - In your browser, navigate to `http://<Your-VM-Public-IP>:3000/` to test the FastAPI app.
   - Do you have access to the page ?

---

### **Task 5: Configure Network Security Group (NSG) Rules**

1. **Modify NSG Rules**
   - Go to the **Networking** settings of your VM.
   - Add a new inbound rule to allow HTTP traffic on port 3000 (add inbound rule with: Source port `*` Destination port `3000`, Service `Custom`, TCP).
   - Test access by refreshing the browser to ensure the HTTP rule works by naviagting to `http://<Your-VM-Public-IP>:3000/`.

---

### **Task 6: Clean Up Resources**

1. **Delete the VM and Associated Resources**
   - Go to **Resource Groups** and select `RG-AzureVM-Assignment`.
   - Click **Delete Resource Group** to delete all resources created for this assignment.

---

### **Additional Resources**

- [Azure Virtual Machines Documentation](https://docs.microsoft.com/azure/virtual-machines/)
