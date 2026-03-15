FROM php:8.2-apache

# Cài package cần thiết
RUN apt-get update && apt-get install -y \
    git \
    zip \
    unzip \
    libzip-dev \
    && docker-php-ext-install zip pdo pdo_mysql

# Enable apache rewrite
RUN a2enmod rewrite

# Cài composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Workdir
WORKDIR /var/www/html

# Copy composer trước để cache
COPY composer.json composer.lock ./

# Install dependency
RUN composer install --no-dev --optimize-autoloader

# Copy toàn bộ source
COPY . .

# Set quyền
RUN chown -R www-data:www-data /var/www/html

# Set document root
RUN sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf

EXPOSE 80