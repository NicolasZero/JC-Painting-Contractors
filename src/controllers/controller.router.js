import fs from 'fs'
import {dirname, join} from 'path';
import {fileURLToPath} from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const home = (req, res) => {
    res.render('home', {title: 'JC Painting Contractors',page:"home"})
}

const blog = (req, res) => {
    let p = 1
    if (req.params.p && Number(req.params.p)) {
        p = req.params.p
    }
    // Define la ruta del archivo json
    const pathRouter = join(__dirname,"..","data","blogs.json")
    
    // Lee el archivo
    fs.readFile(pathRouter, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo', err)
            return res.render('404', {title: 'Page no found'})
        }

        const blog = JSON.parse(data).blogs

        if (blog.length === 0) {
            return res.render('blog', {title: 'JC Painting Contractors',data:[],page:"blog"})  
        }

        // Ordena los blogs por fecha
        blog.sort((a, b) => {
            if (new Date(a.date).getTime() > new Date(b.date).getTime()) {
                return -1
            }
        })

        // renderiza la vista
        return res.render('blog', {title: 'JC Painting Contractors',data:blog,page:"blog",p})
    })
}

const blogPost = (req, res) => {
    // verifica que el id sea un número
    if (!req.params.id || !Number.isInteger(parseInt(req.params.id))) {
        res.render('404', {title: 'Page no found'})
    }
    
    // Define la ruta del archivo json
    const path = join(__dirname,"..","data","blogs.json")
    
    // Lee el archivo
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo', err)
            return res.render('404', {title: 'Page no found'})
        }
        
        const blog = JSON.parse(data).blogs

        // Ordena los blogs por fecha
        blog.sort((a, b) => {
            if (new Date(a.date).getTime() > new Date(b.date).getTime()) {
                return -1
            }
        })

        // Busca el blog por id
        const result = blog.find((blog) => blog.id === parseInt(req.params.id))
        
        // Renderiza la vista
        if (result) {
            const path = join(__dirname,"..","views","blogs")

            // Verifica si el archivo existe
            const exist = fs.readdirSync(path).filter(file=>{
                if (file === `blog${req.params.id}.ejs`) {
                    return file
                }
            })

            if (exist && exist.length > 0) {
                return res.render('blogPost', {data:result,page:"blog"})
            }
        }
        return res.render('404', {title: 'Page no found'})
    })
}

const about = (req, res) => {
    res.render('about', {title: 'JC Painting Contractors',page:"about"})
}

const contact = (req, res) => {
    res.render('contact', {title: 'JC Painting Contractors',page:"contact"})
}

const gallery = (req, res) => {
    const pathRouter = join(__dirname,"..","data","gallery_category.json")
    
    // Lee el archivo
    fs.readFile(pathRouter, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo', err)
            return res.render('404', {title: 'Page no found'})
        }
        
        const gallery = JSON.parse(data).gallery

        if (gallery.length === 0) {
            return res.render('gallery', {title: 'JC Painting Contractors',data:[],page:"gallery"})  
        }

        // Ordena los blogs por fecha
        gallery.sort((a, b) => {
            if (new Date(a.date).getTime() > new Date(b.date).getTime()) {
                return -1
            }
        })

        // renderiza la vista
        return res.render('gallery', {title: 'JC Painting Contractors',page:"gallery",data:gallery})
    })
}

const galleryDetails = (req, res) => {
     // verifica que el id sea un número
     if (!req.params.id || !Number.isInteger(parseInt(req.params.id))) {
        res.render('404', {title: 'Page no found'})
    }

    // Define la ruta del archivo json
    const pathRouter = join(__dirname,"..","data","gallery.json")

    // Lee el archivo
    fs.readFile(pathRouter, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo', err)
            return res.render('404', {title: 'Page no found'})
        }
        
        const gallery = JSON.parse(data).gallery

        return res.send(gallery)

        if (gallery.length === 0) {
            return res.render('gallery', {title: 'JC Painting Contractors',data:[],page:"gallery"})  
        }

        // Ordena los blogs por fecha
        gallery.sort((a, b) => {
            if (new Date(a.date).getTime() > new Date(b.date).getTime()) {
                return -1
            }
        })

        // renderiza la vista
        return res.render('gallery', {title: 'JC Painting Contractors',page:"gallery",data:gallery})
    })
}

const services = (req, res) => {
    res.render('services', {title: 'JC Painting Contractors',page:"services"})
}


export default {blog, about, contact, gallery, services, home, blogPost, galleryDetails} 