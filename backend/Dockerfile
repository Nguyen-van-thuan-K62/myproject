FROM php:8.2-apache

# Cài extension cần cho Laravel
RUN docker-php-ext-install pdo pdo_mysql

# Copy code vào container
COPY . /var/www/html

# Đổi document root sang public
RUN sed -i 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/000-default.conf

# Enable rewrite
RUN a2enmod rewrite