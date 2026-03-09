# Installation

Install all prerequisites before running the platform locally. Choose your operating system below.

## Prerequisites

| Requirement | Version |
|---|---|
| Node.js | >= 20.17.0 |
| Yarn | 3.6.1 |
| Docker + Docker Compose | Latest |
| Git | Latest |
| Python | 3.10+ (for AI services only) |

---

## macOS

### 1. Install Node.js

**Using Homebrew (recommended):**

```bash copy
# Install Homebrew if not installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js 20.x
brew install node@20
```

**Using NVM (Node Version Manager):**

```bash copy
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

# Install and use Node.js 20.17.0
nvm install 20.17.0
nvm use 20.17.0
```

### 2. Install Yarn 3.6.1

```bash copy
# Install Yarn globally
npm install -g yarn

# Set Yarn version to 3.6.1
yarn set version 3.6.1
```

### 3. Install Docker

Download and install **Docker Desktop** from [Docker's official website](https://www.docker.com/products/docker-desktop/).

After installation, verify it's running:

```bash copy
docker --version
docker compose version
```

### 4. Install Git

```bash copy
# Install Git via Homebrew
brew install git
```

---

## Ubuntu / Debian

### 1. Install Node.js

```bash copy
# Update package list
sudo apt update

# Install Node.js 20.x via NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version  # Should show v20.x.x
```

**Using NVM:**

```bash copy
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

# Load NVM (add to ~/.bashrc too)
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install and use Node.js 20.17.0
nvm install 20.17.0
nvm use 20.17.0
```

### 2. Install Yarn 3.6.1

```bash copy
npm install -g yarn
yarn set version 3.6.1
```

### 3. Install Docker and Docker Compose

```bash copy
# Install Docker
sudo apt update
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt update
sudo apt install -y docker-ce

# Run Docker without sudo
sudo usermod -aG docker ${USER}
su - ${USER}

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.23.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 4. Install Git

```bash copy
sudo apt install -y git
```

---

## Verify Everything

Once installed, run these checks:

```bash copy
node -v       # v20.x.x
yarn -v       # 3.6.1
docker -v     # Docker version ...
git --version # git version ...
```

## Next Step

→ [Configure your environment](/docs/setup/environment)
