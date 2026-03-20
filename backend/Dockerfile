FROM php:8.2-apache

RUN apt-get update && apt-get install -y \
    git \
    zip \
    unzip \
    libzip-dev \
    libpq-dev \
    && docker-php-ext-install zip pdo pdo_pgsql pgsql

RUN a2enmod rewrite

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copy composer trước
COPY composer.json composer.lock ./

# Cài dependency (tắt script)
RUN composer install --no-dev --optimize-autoloader --no-scripts

# Copy toàn bộ source
COPY . .

# Chạy artisan sau khi đã có source
RUN php artisan package:discover

# Set quyền
RUN chown -R www-data:www-data /var/www/html

# Set public folder
RUN sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf

EXPOSE 80

CMD php artisan migrate --force && apache2-foreground