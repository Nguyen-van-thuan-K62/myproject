FROM php:8.2-apache

# Cài extension Laravel cần
RUN docker-php-ext-install pdo pdo_mysql

# Enable rewrite
RUN a2enmod rewrite

# Cài composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy source code
COPY . /var/www/html

# Cài thư viện Laravel
WORKDIR /var/www/html
RUN composer install --no-dev --optimize-autoloader

# Đổi document root sang public
RUN sed -i 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/000-default.conf

# Permission
RUN chown -R www-data:www-data /var/www/html