<script>

</script>
<template>
  
  <video
    src="../Brighton.mp4"
    type="video/mp4"
    autoplay
    loop
    muted
  ></video>

  <div class="welcome-text-container">
    <h1 class="welcome-text">Hello Coach!</h1>
  </div>

  <div class="button-container">
    <a class="btn btn-primary" href="/players" role="button">Players</a>
    <a class="btn btn-primary" href="/teams" role="button">Teams</a>
</div>
</template>

<style>


  video {
    z-index: -1; 
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .button-container {
  position: absolute;
  bottom: 15%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
  max-width: 570px; 
  width: 100%;
  justify-content: center;
}

@keyframes typing {
    from {
      color: transparent;
      text-shadow: 0 0 10px rgba(255, 215, 0, 0.8); 
    }
    to {
      color: #FFD700; 
      text-shadow: none; 
    }
  }

  .welcome-text-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #FFF; 
  }

  .welcome-text {
    font-size: 3rem;
    animation: typing 2s steps(30, end) forwards;
  }

.btn {
  padding: 15px 25px;
  font-size: 1.5rem;
  border-radius: 15px;
  margin: 0 15px;
}

.btn:hover {
  transform: scale(1.1); 
  color: #FFD700;
  text-decoration: none;
}

</style>


