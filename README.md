# PlatePay - Streamlined Fueling with Number Plate Recognition 🚗💨

## Introduction 🌟

PlatePay is an innovative self-service solution designed to revolutionize the refueling experience at gas stations through number plate recognition technology. Our system aims to significantly reduce queue times and streamline the payment process, addressing the inefficiencies of traditional automated payment systems.

### The Problem 🕒

Current self-service systems at gas stations involve multiple steps, including card validation and manual input, leading to lengthy processes and delays. PlatePay offers a more efficient alternative by leveraging advanced technology for a smoother user experience.

### Our Solution 🛠️

PlatePay simplifies the refueling process by:
1. **Pre-Filled Information:** Users can load credit, set default fuel types and amounts, and enter their vehicle’s number plate in advance via our mobile app. 📱
2. **Effortless Refueling:** At the station, our camera system captures the vehicle’s number plate, retrieves pre-filled data, and completes the refueling process quickly. ⛽
3. **Enhanced Security:** To ensure authenticity, PlatePay sends a One-Time Password (OTP) to the user’s mobile for verification, preventing fraud and unauthorized use. Additionally, it checks the user’s balance before dispensing fuel. 🔒

## Technology Stack 💻

- **Frontend:** React, JavaScript
- **Backend:** Python
- **Communication:** Socket.io
- **AI Tools:** Ultralytics, YOLO, OpenCV
- **Data:** Number Plate Dataset - https://www.kaggle.com/datasets/andrewmvd/car-plate-detection

### Frontend 🖥️

The frontend is responsible for:
- User interaction to verify OTP and review pre-filled data 🔍
- Allowing users to modify fuel types and amounts ✍️
- Checking and displaying credit balance status 💳
- Providing manual entry options for unrecognized number plates 📝
- Facilitating user sign-up if the number plate is not found 🚀

### Backend 🔧

The backend performs:
- Capture and conversion of number plate images to text 📸➡️📝
- Data retrieval from the database based on the number plate 🗃️
- Integration with the frontend to deliver results 🔄
- AI processing with YOLO and OpenCV for accurate number plate recognition 🤖

### Communication 🌐

The frontend and backend communicate via Socket.io, ensuring real-time data transfer of:
- Pre-filled user data 📤
- Credit balance information 💰

## Installation 🛠️

To set up PlatePay locally, follow these steps:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/NZpatelK/PlatePay.git
   ```

2. **Frontend Setup**
   - Navigate to the `frontend` directory
   - Install dependencies
     ```bash
     npm install
     ```
   - Start the development server
     ```bash
     npm run dev
     ```

3. **Backend Setup**
   - Navigate to the `backend` directory
   - Install dependencies
     ```bash
     pip install -r number_plate_recognition/requirements.txt
     ```
   - Start the backend server
     ```bash
     python main.py
     ```

4. **AI Tools Configuration**
   - Ensure YOLO, OpenCV, and Ultralytics are installed and configured in your backend environment. ⚙️

## Contributing 🤝

We welcome contributions to enhance PlatePay. To contribute:
1. Fork the repository 🍴
2. Create a new branch 🌿
3. Commit your changes ✏️
4. Push to the branch ⬆️
5. Submit a pull request 📨

## License 📜

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact 📧

For questions or support, reach out to us at [patelk.dev@hotmail.com](mailto:patelk.dev@hotmail.com).
