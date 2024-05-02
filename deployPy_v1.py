import os
import subprocess
import mysql.connector
from zipfile import ZipFile

# Development Machine Credentials
dev_machine = "192.168.194.115"
dev_user = "joshua"
dev_pass = "jj499"

# QA Machine Credentials
qa_machine = "192.168.194.224"
qa_user = "newusername"
qa_pass = "apple123"

# Production Machine Credentials
production_machine = "192.168.194.245"
production_user = "it490prod"
production_pass = "it490"

# Database Credentials
db_host = "localhost"
db_user = "mover"
db_pass = "12345"
db_name = "PackageHistory"

new_dir_name = ""
#version = 1

# Function to determine the latest version for a specific machine type
#def get_latest_version(type):
    #type = type
   # print(type)
   # cnx = mysql.connector.connect(user=db_user, password=db_pass, host=db_host, database=db_name)
   # cursor = cnx.cursor()
   # query = "SELECT MAX(version) FROM version WHERE version=%s"
   # cursor.execute(query, (version,))
   # result = cursor.fetchone()[0]
   # cursor.close()
   # cnx.close()
   # print(result)
   # print(version + 1)
   # return result

# Function to create a new version directory
def create_version_directory(type):
    type = type
    global version
    version = 1
    print("I am here before latest_version ")
    print("Here is what type iN CREATE_VERSION_DIRECTORY", type)
    new_dir_name = f"{type}-v{version}"

    while os.path.exists(f"{new_dir_name}.zip"):
        version += 1
        new_dir_name = f"{type}-v{version}"
    
    os.makedirs(new_dir_name, exist_ok=True)
    print("Here is new directory", new_dir_name)
    
    copy_files_from_dev(new_dir_name)
    #package_and_log_version(new_dir_name)
    #print(f"Package {new_dir_name}.zip created.")
    #copy_files_to_qa(new_dir_name)

# Function to copy files from the development machine
def copy_files_from_dev(new_dir_name):
    
    dev_path= "/home/joshua/IT490"
    print(new_dir_name)
    print("I am in copy files from dev so new dir should be", new_dir_name)
    subprocess.run(["rsync", "-az", "--progress", "-e", f"sshpass -p {dev_pass} ssh -o StrictHostKeyChecking=no", f"{dev_user}@{dev_machine}:{dev_path}/", f"./{new_dir_name}"])
    #subprocess.run(["sshpass", "-p", production_pass, "scp", "-o", "StrictHostKeyChecking=no", "-r", "./*", f"{production_user}@{production_machine}:{production_path}"])
    print(new_dir_name)
    package_and_log_version(new_dir_name)
    print("Files copied from dev completed")
    

def copy_files_to_qa(type,version):
    path = f"{type}-v{version}"
    qa_path = "/home/newusername/IT490"
    print("path to prod, maybe?",f"{qa_path}/{path}")
    subprocess.run(["rsync", "-az", "--progress", "-e", f"sshpass -p {qa_pass} ssh -o StrictHostKeyChecking=no", f"{path}.zip", f"{qa_user}@{qa_machine}:{qa_path}"])
    #with ZipFile(f"{path}.zip", "r") as zip_ref:
        #print("Unzipping files to QA")
        #zip_ref.extractall(qa_path)
    #print("Files copied to QA successfully.")
    print(subprocess.run(["pwd"]))
    subprocess.run(["sshpass", "-p", qa_pass, "ssh", "-o", "StrictHostKeyChecking=no", f"{qa_user}@{qa_machine}","unzip", "-o", f"{qa_path}/{path}.zip", "-d", qa_path])


# Function to copy files from deployment to production
def copy_files_to_production(path,version):
    path = f"{type}-v{version}"
    prod_path = "/home/it490prod/IT490"
    print("path to prod, maybe?",f"{prod_path}/{path}")
    subprocess.run(["rsync", "-az", "--progress", "-e", f"sshpass -p {production_pass} ssh -o StrictHostKeyChecking=no", f"{path}.zip", f"{production_user}@{production_machine}:{prod_path}"])
    #with ZipFile(f"{path}.zip", "r") as zip_ref:
        #print("Unzipping files to QA")
        #zip_ref.extractall(qa_path)
    #print("Files copied to QA successfully.")
    print(subprocess.run(["pwd"]))
    subprocess.run(["sshpass", "-p", production_pass, "ssh", "-o", "StrictHostKeyChecking=no", f"{production_user}@{production_machine}","unzip", "-o", f"{prod_path}/{path}.zip", "-d", prod_path])

def package_and_log_version(file):
    type = file
    subprocess.run(["zip", "-r", f"{type}.zip", f"./{type}", "-x", "*.config"])
    print(f"Package {type}.zip created.")
    cnx = mysql.connector.connect(user=db_user, password=db_pass, host=db_host, database=db_name)
    cursor = cnx.cursor()
    query = "INSERT INTO version (version, name) VALUES (%s, %s)"
    values = (version, type)
    cursor.execute(query, values)
    cnx.commit()
    cursor.close()
    cnx.close()

# Function to rollback to the previous version
def rollback(type,version):
    
    cnx = mysql.connector.connect(user=db_user, password=db_pass, host=db_host, database=db_name)
    cursor = cnx.cursor()

    # Retrieve all rows from the version table
    query = "SELECT version, name, passFail FROM version ORDER BY version DESC"
    cursor.execute(query)
    results = cursor.fetchall()

    latest_successful_version = None
    latest_successful_name = None
    bad_version=f"{type}-v{version}"
    # Iterate through the rows to find the first successful version
    for row in results:
        version, name, passFail = row
        if passFail == 1:
            latest_successful_version = version
            latest_successful_name = name
            break

    if latest_successful_version is not None:
        print(f"Rolling back to the latest successful version: {latest_successful_name}")

        # Remove the bad version from QA
        
        remove_files_from_qa(bad_version)

        # Rollback to the latest successful version on QA
        copy_files_to_qa(type, latest_successful_version)

        # Remove the bad version from production
        remove_files_from_production(bad_version)

        # Rollback to the latest successful version on production
        copy_files_to_production(type, latest_successful_version)

        print("Rollback completed successfully.")
    else:
        print("No successful version found in the database. Rollback failed.")

    cursor.close()
    cnx.close()


def remove_files_from_qa(bad_version):
    qa_path = "/home/newusername/IT490"
    bad_path= bad_version
    print("path for deletion",f"{qa_path}/{bad_path}")
    subprocess.run(["sshpass", "-p", qa_pass, "ssh", "-o", "StrictHostKeyChecking=no", f"{qa_user}@{qa_machine}", f"echo '{qa_pass}' | sudo -S rm -rf {qa_path}/{bad_path}.zip {qa_path}/{bad_path}"])
    print(f"Removed bad version ({bad_path}) from QA environment.")

def remove_files_from_production(bad_version):
    prod_path = "/home/it490prod/IT490"
    bad_path=bad_version

    print("path tfor deletion maybe?",f"{prod_path}/{bad_path}")
    #print=(f"{bad_version_path}","This should be the path of deletion")
    subprocess.run(["sshpass", "-p", production_pass, "ssh", "-o", "StrictHostKeyChecking=no", f"{production_user}@{production_machine}", f"echo '{production_pass}' | sudo -S rm -rf {prod_path}/{bad_path}.zip {prod_path}/{bad_path}"])
    print(f"Removed bad version ({bad_path}) from production environment.")

# Main script
print("Welcome to the Deployment Script!")
print("1. Create a new version")
print("2. Exit")

choice = input("Enter your choice (1-2): ")

if choice == "1":
    type = input("Enter the machine type: ")
    print("i am here at choice")
    #copy_files_from_dev(type)
    create_version_directory(type)
    print("I am at choice!!!!!!!!!!!!!!!! ", type)
   # package_and_log_version(type)

    print("Do you want to deploy this version to QA and/or production?")
    print("1. QA")
    print("2. Production")
    print("3. Skip")
    deploy_choice = input("Enter your choice (1-3): ")

    if deploy_choice == "1":
        copy_files_to_qa(type,version)
    elif deploy_choice == "2":
        copy_files_to_production(type,version)
    else:
        print("Invalid choice. Skipping deployment.")

    print("Do you want to copy files to production?")
    print("1. Yes")
    print("2. No")
    qa_to_prod_choice = input("Enter your choice (1-2): ")

    if qa_to_prod_choice == "1":
        copy_files_to_production(type,version)
    else:
        print("Invalid choice. Skipping copying from QA to production.")

    print("Is the deployed package good or bad?")
    print("1. Good")
    print("2. Bad")
    package_status = input("Enter your choice (1-2): ")

    if package_status == "1":
        print("Package marked as good. No rollback needed.")
        passF=1
        subprocess.run(["zip", "-r", f"{type}-v{version}.zip", f"./{type}-v{version}", "-x", "*.config"])
        print(f"Package {type}-v{version}.zip created.")
        cnx = mysql.connector.connect(user=db_user, password=db_pass, host=db_host, database=db_name)
        cursor = cnx.cursor()
        update_query = "Update version set passFail=%s where version=%s"
        update_values = (passF,version)
        cursor.execute(update_query, update_values)
        cnx.commit()
        cursor.close()
        cnx.close()
        
    elif package_status == "2":
        print("Package marked as bad. Initiating rollback...")
        passF=0
        subprocess.run(["zip", "-r", f"{type}-v{version}.zip", f"./{type}-v{version}", "-x", "*.config"])
        print(f"Package {type}-v{version}.zip created.")
        cnx = mysql.connector.connect(user=db_user, password=db_pass, host=db_host, database=db_name)
        cursor = cnx.cursor()
        updated_query = "Update version set passFail=%s where version=%s"
        updated_values = (passF,version)
        cursor.execute(updated_query, updated_values)
        cnx.commit()
        cursor.close()
        cnx.close()
        rollback(type,version)
    else:
        print("Invalid choice. No action taken.")

elif choice == "2":
    exit(0)
else:
    print("Invalid choice. Exiting.")
    exit(1)