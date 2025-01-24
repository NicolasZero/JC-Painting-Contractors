import { request, Router } from "express";
import controller from '../controllers/controller.router.js'

const router = Router();

// ===== Views =====//
router.get("/", controller.home)
router.get("/services", controller.services)
router.get("/contact", controller.contact)
router.get("/gallery", controller.gallery)
router.get("/gallery/category/:id?", controller.galleryDetails)
router.get("/about", controller.about)
router.get("/blog", controller.blog)
router.get("/blog/p/:p?", controller.blog)
router.get("/blog/:id", controller.blogPost)
// 404
router.get('*', (req, res) => {res.render('404', {title: 'Page no found'})})

export default router