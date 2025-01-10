import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {res.render('home', {title: 'JC Painting Contractors',page:"home"})})
router.get("/blog", (req, res) => {res.render('blog', {title: 'JC Painting Contractors',page:"blog"})})
router.get("/services", (req, res) => {res.render('services', {title: 'JC Painting Contractors',page:"services"})})
router.get("/contact", (req, res) => {res.render('contact', {title: 'JC Painting Contractors',page:"contact"})})
router.get("/gallery", (req, res) => {res.render('gallery', {title: 'JC Painting Contractors',page:"gallery"})})
router.get("/about", (req, res) => {res.render('about', {title: 'JC Painting Contractors',page:"about"})})

router.get('*', (req, res) => {res.render('404', {title: 'Page no found'})})

export default router