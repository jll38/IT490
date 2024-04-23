#!/bin/bash

# Development Machine Credentials
dev_machine="192.168.194.115"
dev_user="joshua"
dev_pass="jj499"

# QA Machine Credentials
qa_machine="192.168.194.224"
qa_user="newusername"
qa_pass="apple123"

# Production Machine Credentials
production_machine="192.168.194.119"
production_user="it490QA"
production_pass="it49024"

# Database Credentials
db_host="localhost"
db_user="deploy"
db_pass="12345"
db_name="PackageHistory"

# Function to determine the latest version for a specific machine type
get_latest_version() {
    type=$1
    echo $(mysql -u"$db_user" -p"$db_pass" -h"$db_host" -D"$db_name" -sse "SELECT MAX(version) FROM versions WHERE type='$type';")
}

# Function to create a new version directory
create_version_directory() {
    type=$1
    latest_version=$(get_latest_version "$type")
    new_version=$((latest_version + 1))
    new_dir_name="$type-v$new_version"
    mkdir -p "$new_dir_name"
    cd "$new_dir_name"
    echo "$new_dir_name"
}

# Function to copy files from the development machine
copy_files_from_dev() {
    type=$1
    dev_path="/home/joshua/it490"

    # Copy the files using the correct path
    for ((i=9; i<length; i++)); do
        echo "Copying ${lines[i]} from dev..."
        sshpass -p "$dev_pass" scp "$dev_user@$dev_machine:$dev_path/${lines[i]}" "./${lines[i]}"
    done
}

# Function to copy files from deployment to QA
copy_files_to_qa() {
    type=$1
    qa_path="/home/avneetkaur/490ITProject/IT490"

    # Copy the files to QA
    sshpass -p "$qa_pass" scp -o StrictHostKeyChecking=no -r ./* "$qa_user@$qa_machine:$qa_path"
    echo "Files copied to QA successfully."
}

# Function to copy files from QA back to deployment to production
copy_files_from_qa_to_production() {
    type=$1
    qa_path="/home/avneetkaur/490ITProject/IT490"
    production_path="/home/it490qa/it490"

    # Copy the files from QA to production
    sshpass -p "$production_pass" scp -o StrictHostKeyChecking=no -r "$qa_user@$qa_machine:$qa_path/*" "$production_user@$production_machine:$production_path"
    echo "Files copied from QA to production successfully."
}

# Function to copy files from deployment to production
copy_files_to_production() {
    type=$1
    production_path="/home/it490qa/it490"

    # Copy the files to production
    sshpass -p "$production_pass" scp -o StrictHostKeyChecking=no -r ./* "$production_user@$production_machine:$production_path"
    echo "Files copied to production successfully."
}

# Function to package the files and log the version in the database
package_and_log_version() {
    type=$1
    version_dir=$(pwd)
    version=${version_dir##*-v}

    # Zip files excluding the config
    zip -r -j "$pkgName-v$version.zip" ./* -x "*.config"
    echo "Package $pkgName-v$version.zip created."

    # Log the version in the database
    mysql -u"$db_user" -p"$db_pass" -h"$db_host" -D"$db_name" -e "INSERT INTO versions (id INT AUTO_INCREMENT PRIMARY KEY,version INT NOT NULL,package_name VARCHAR(100) NOT NULL,pass INT NOT NULL) VALUES ('$id','$version', '$pkgName','$pass');"
}

# Main script
echo "Welcome to the Deployment Script!"
echo "1. Create a new version"
echo "2. Exit"

read -p "Enter your choice (1-2): " choice

case $choice in
    1)
        read -p "Enter the machine type: " type
        new_dir=$(create_version_directory "$type")
        copy_files_from_dev "$type"
        package_and_log_version "$type"

        # Prompt user to copy files to QA or production
        echo "Do you want to deploy this version to QA and/or production?"
        echo "1. QA"
        echo "2. Production"
        echo "3. Skip"
        read -p "Enter your choice (1-3): " deploy_choice

        case $deploy_choice in
            1)
                copy_files_to_qa "$type"
                ;;
            2)
                copy_files_to_production "$type"
                ;;
            3)
                ;;
            *)
                echo "Invalid choice. Skipping deployment."
                ;;
        esac

        # Prompt user to copy files from QA to production
        echo "Do you want to copy files from QA to production?"
        echo "1. Yes"
        echo "2. No"
        read -p "Enter your choice (1-2): " qa_to_prod_choice

        case $qa_to_prod_choice in
            1)
                copy_files_from_qa_to_production "$type"
                ;;
            2)
                ;;
            *)
                echo "Invalid choice. Skipping copying from QA to production."
                ;;
        esac
        ;;
    2)
        exit 0
        ;;
    *)
        echo "Invalid choice. Exiting."
        exit 1
        ;;
esac
