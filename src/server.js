const express = require('express');

const ejs = require('ejs');
const path = require('path');
const puppeteer = require('puppeteer');


//criar o server
const app  = express();

const passengers = [
    {
        name: "jauva",
        flightNumber: 5678,
        time: "18h00"
    },
    {
        name: "romano",
        flightNumber: 7854,
        time: "18h30"
    },
    {
        name: "ronalda",
        flightNumber: 6785,
        time: "18h50"
    }
]

app.get('/pdf', async(request, response) => {
    
    const browser = await puppeteer.launch({ })
    const page = await browser.newPage()

    await page.goto('http://localhost:3000/' ,{
        waitUntil: 'networkidle0'
    })
    
    const pdf = await page.pdf({
        printBackground: true,
        format: 'Letter',
        
    })

    await browser.close()

    response.contentType("application/pdf")

    return response.send(pdf)

    
})

app.get('/',(request,response) =>{
    
    const filePath = path.join(__dirname,"print.ejs")

    ejs.renderFile(filePath,{passengers} , (err, html) =>{
        if(err){
            return response.send('Erro na leitura do arquivo')
        }
        

            // enviar para o browser
            return response.send(html);
        })

        
    })



// iniciar o server
app.listen(3000)

