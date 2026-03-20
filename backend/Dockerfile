FROM php:8.2-apache

# Cài package cần thiết + PostgreSQL driver
RUN apt-get update && apt-get install -y \
    git \
    zip \
    unzip \
    libzip-dev \
    libpq-dev \
    && docker-php-ext-install zip pdo pdo_pgsql pgsql

# Enable apache rewrite
RUN a2enmod rewrite

# Cài composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copy composer trước (tối ưu build)
COPY composer.json composer.lock ./

RUN composer install --no-dev --optimize-autoloader

# Copy toàn bộ source
COPY . .

# Set quyền
RUN chown -R www-data:www-data /var/www/html

# Set document root sang public
RUN sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf

EXPOSE 80

# Start app + migrate DB
CMD php artisan migrate --force && apache2-foreground