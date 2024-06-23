
<template>
  

  <div class="welcome-text-container">
    <h1 class="welcome-text">Hello Coach!</h1>
  </div>

  <div class="button-container">
    <a class="btn btn-primary" href="/teams" role="button">Teams</a>
</div>
</template>

<style>


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
    0% {
      color: transparent;
      text-shadow:
        0 0 10px rgba(167, 28, 133, 0.8),
        0 0 20px rgba(167, 28, 133, 0.6),
        0 0 30px rgba(167, 28, 133, 0.4),
        0 0 40px rgba(167, 28, 133, 0.2),
        0 0 50px rgba(167, 28, 133, 0.1);
      }
    50% {
      color: #A71C85;
      text-shadow:
        0 0 20px rgba(167, 28, 133, 0.8),
        0 0 30px rgba(167, 28, 133, 0.6),
        0 0 40px rgba(167, 28, 133, 0.4),
        0 0 50px rgba(167, 28, 133, 0.2),
        0 0 60px rgba(167, 28, 133, 0.1);

    }
    100% {
      color: #A71C85;
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
  text-decoration: none;
}

</style>


