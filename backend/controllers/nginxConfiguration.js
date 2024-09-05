const fs = require('fs');
const { exec } = require('child_process');
const nginxConfigPath = '/etc/nginx/sites-available/foxyurl'; 
const domainExists = (configContent, domain) => {
    const serverNameRegex = new RegExp(`server_name[\\s\\S]*${domain}[\\s;]`, 'g');
    return serverNameRegex.test(configContent);
};
const addDomain = (newDomain) => {
    fs.readFile(nginxConfigPath, 'utf8', (err, data) => {
        let message = '';

        if (err) {
            message += `Error reading NGINX config file: ${err}\n`;
            console.log(message);
            return;
        }

        if (domainExists(data, newDomain)) {
            message += `Domain ${newDomain} already exists. Process canceled.\n`;
            console.log(message);
            return;
        }
        const serverNameRegex = /server_name\s+([\w\.\s]+);/;
        const match = data.match(serverNameRegex);
        if (match) {
            const serverNames = match[1].trim();
            const updatedServerNames = `${serverNames} ${newDomain}`;
            const updatedConfig = data.replace(serverNameRegex, `server_name ${updatedServerNames};`);

            fs.writeFile(nginxConfigPath, updatedConfig, 'utf8', (err) => {
                if (err) {
                    message += `Error writing to NGINX config file: ${err}\n`;
                    console.log(message);
                    return;
                }

                message += `Domain ${newDomain} added successfully.\n`;

                exec('sudo systemctl reload nginx', (err, stdout, stderr) => {
                    if (err) {
                        message += `Error reloading NGINX: ${err}\n`;
                        console.log(message);
                        return;
                    }

                    message += 'NGINX reloaded successfully.\n';
                    console.log(message);
                });
            });
        } else {
            message += 'No server_name directive found in the NGINX config.\n';
            console.log(message);
        }
    });
};
const domainToAdd = process.argv[2];
if (!domainToAdd) {
    console.error('Please provide a domain as an argument.\n');
    process.exit(1);
}
addDomain(domainToAdd);
