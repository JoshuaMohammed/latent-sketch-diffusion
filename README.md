# Sketch-to-Image Generation using RLEPUN

Residual Latent Edge Predictor U-Net (RLEPUN) – A diffusion-based approach for generating realistic images from sketches, integrating classifier guidance and residual latent refinement.

---

## Project Structure
```
Project Root
│
├── Dataset.ipynb           # Data preparation and preprocessing
├── Classifier.ipynb        # Sketch classifier training
├── ResLEPUNet.ipynb        # RLEPUN model training and diffusion process
│
└── UI/                     # React frontend for drawing, uploading, and generating images
    ├── src/
    └── public/
```

---

## Overview
This project focuses on transforming sketch drawings into realistic images using diffusion models enhanced by a custom Residual Latent Edge Predictor U-Net (RLEPUN).  
It improves alignment between sketches and generated outputs while maintaining high efficiency and low GPU usage.
The model was trained on a custom sketch dataset containing two primary categories Giraffe and Zebra

---

## Features
- Sketch-to-Image Translation using latent diffusion  
- Classifier Guidance for prompt-based control  
- RLEPUN Refinement improves structural and edge consistency  
- Interactive React UI for sketch drawing and image generation  
- Optimized for limited resources – runs efficiently on mid-range GPUs

---

## Technologies Used
- Diffusion Models (Stable Diffusion backbone)  
- U-Net and ResNet Blocks  
- VAE Latent Encoding  
- PyTorch for model training  
- React + Vite for UI frontend  
- LPIPS for perceptual quality evaluation

---

## Workflow Overview


This system generates realistic images from user sketches and optional text prompts using a diffusion-based model.


1. **User Input**
- Sketch and optional text are provided via a React frontend.
- Inputs are sent to a Flask API running on Google Colab (Ngrok used for communication).


2. **Sketch Classification**
- A ResNet18 classifier identifies the sketch category to guide prompt generation.


3. **Latent Space Preparation**
- Text is encoded via Stable Diffusion’s text encoder.
- Sketch is converted into a latent edge map.
- Noise is initialized and the diffusion scheduler is set.


4. **Diffusion Process**
- The U-Net iteratively denoises the latent representation.
- **Classifier guidance** aligns the image with the text prompt.
- **Sketch guidance** enforces structural consistency.


5. **RLEPUN Refinement**
- Residual Latent Edge Predictor U-Net (RLEPUN) refines edges in latent space.
- Predicted edges are compared with sketch latents to dynamically adjust features.
- Improves structural accuracy and edge consistency.


6. **Final Image Generation**
- Refined latents are decoded via the VAE decoder into the final image.
- Output is returned to the frontend for preview and download.

---

## RLEPUN Mechanism


RLEPUN (Residual Latent Edge Predictor U-Net) is an auxiliary network integrated into the diffusion process to improve edge accuracy and structural fidelity.


- Receives intermediate U-Net features and noise embeddings.
- Features are resized and concatenated to predict a latent edge map.
- Predicted edges are compared with the sketch’s latent edges.
- Gradients are applied to refine the diffusion latents, ensuring the generated image better respects the sketch structure while maintaining realism.


---

## User Interface
An interactive React application allowing users to:
- Draw or upload a sketch  
- Enter a text prompt  
- Generate AI-enhanced images  
- Download and preview results  

![UI](https://raw.githubusercontent.com/JoshuaMohammed/latent-sketch-diffusion/main/images/ui.png)

---

## Evaluation
The performance of the proposed RLEPUN model was evaluated in comparison with U-Sketch under identical training conditions described in the original U-Sketch paper.
Both models were trained for 10 epochs using the same dataset and configurations. The evaluation metrics included:
 - LPIPS (Learned Perceptual Image Patch Similarity) — to assess perceptual similarity between generated and reference images.
 - Human Evaluation — to measure visual realism and alignment between the generated image and the input sketch.
Two variants of RLEPUN were trained for comparison:
 - RLEPUN (MSE Loss): trained under the same conditions as U-Sketch using the Mean Squared Error loss.
 - RLEPUN (Custom Loss): trained using the proposed uncertainty-weighted loss function to improve perceptual consistency and edge prediction accuracy.

![Results](https://raw.githubusercontent.com/JoshuaMohammed/latent-sketch-diffusion/main/images/results.png)

---

## Results
- Improved sketch–image consistency  
- Higher perceptual quality scores (LPIPS)  
- Lower resource consumption during inference  

![Generated Samples](https://raw.githubusercontent.com/JoshuaMohammed/latent-sketch-diffusion/main/images/generated_samples.png)

---

## Keywords
Diffusion Models • Sketch-to-Image • U-Net • ResNet • VAE • Latent Space • RLEPUN

---

## Future Work

- **Expand the Dataset:**  
  Build a larger and more diverse dataset containing multiple sketch styles and object categories to improve generalization.

- **Longer and More Sustainable Training:**  
  Train the model for more epochs with optimized learning schedules to enhance image quality and stability over time.

- **Pose-Aware Enhancement:**  
  Introduce automatic joint or keypoint detection from sketches to capture pose and orientation information, allowing the model to better understand spatial relationships.

- **User-Guided Descriptions:**  
  Allow users to input descriptive text prompts directly, enabling finer control over image generation and improving the model’s predictive capability.

---

## Author
**Joshua Mohammed**  
This work is part of a research project on sketch-to-image generation using latent diffusion models.
