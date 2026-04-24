import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import TopBar from '../components/Editor/TopBar';
import LeftPanel from '../components/Editor/LeftPanel';
import RightPanel from '../components/Editor/RightPanel';
import MainCanvas from '../components/Editor/MainCanvas';
import { HONDA_TEMPLATES, LOGO_URL } from '../constants';
import { EditableElement } from '../types';

export default function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const template = HONDA_TEMPLATES.find(t => t.id === id) || HONDA_TEMPLATES[0];

  const getInitialElements = (templateId: string): Record<string, EditableElement> => {
    if (templateId === 'acura-premium') {
      return {
        'root': {
          id: 'root',
          type: 'container',
          content: '',
          style: { backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', color: '#000', fontFamily: 'Inter, sans-serif' },
          children: ['hero-section', 'brands-section', 'meet-models-section', 'exhilaration-grid-section', 'safety-strip', 'trade-in-section', 'testimonials-section', 'anniversary-section', 'footer-section']
        },
        'hero-section': {
          id: 'hero-section',
          type: 'container',
          content: '',
          style: { height: '800px', backgroundImage: 'url(https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=1920)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
          children: ['nav-v2', 'hero-content-v2']
        },
        'nav-v2': {
          id: 'nav-v2',
          type: 'container',
          content: '',
          style: { position: 'absolute', top: '0', width: '100%', height: '109px', backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 60px' },
          children: ['nav-v2-container']
        },
        'nav-v2-container': {
          id: 'nav-v2-container',
          type: 'container',
          content: '',
          style: { width: '1394px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
          children: ['nav-v2-logo', 'nav-v2-menu', 'nav-v2-call']
        },
        'nav-v2-logo': { id: 'nav-v2-logo', type: 'image', content: LOGO_URL, style: { height: '80px', filter: 'brightness(0) invert(1)' } },
        'nav-v2-menu': { id: 'nav-v2-menu', type: 'text', content: 'New Vehicles • Used Vehicles • Sell or Trade • Special Offers • About Us', style: { color: '#FFFFFF', fontWeight: '400', fontSize: '18px', gap: '30px', display: 'flex' } },
        'nav-v2-call': { id: 'nav-v2-call', type: 'button', content: '(800) 123-4567', style: { backgroundColor: '#FFFFFF', color: '#070707', borderRadius: '5px', padding: '16px 28px', fontWeight: '600', fontSize: '18px' } },
        
        'hero-content-v2': {
          id: 'hero-content-v2',
          type: 'container',
          content: '',
          style: { textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px', marginTop: '100px' },
          children: ['hero-v2-title', 'hero-v2-tabs', 'hero-v2-search']
        },
        'hero-v2-title': { id: 'hero-v2-title', type: 'text', content: 'Find Your Perfect Car', style: { fontSize: '42px', fontWeight: '700', color: '#FFFFFF' } },
        'hero-v2-tabs': { id: 'hero-v2-tabs', type: 'text', content: 'Filtered • Search • Finance', style: { fontSize: '22px', fontWeight: '600', color: '#FFFFFF', borderBottom: '2px solid white', paddingBottom: '5px' } },
        'hero-v2-search': {
          id: 'hero-v2-search',
          type: 'container',
          content: '',
          style: { width: '949px', height: '76px', backgroundColor: '#FFFFFF', borderRadius: '80px', display: 'flex', alignItems: 'center', padding: '10px 10px 10px 40px', justifyContent: 'space-between' },
          children: ['search-v2-fields', 'search-v2-btn']
        },
        'search-v2-fields': { id: 'search-v2-fields', type: 'text', content: 'New | Acura | Any Model', style: { color: '#050B20', fontSize: '18px', flex: 1, textAlign: 'left' } },
        'search-v2-btn': { id: 'search-v2-btn', type: 'button', content: 'SEARCH CARS', style: { backgroundColor: '#000', color: '#FFF', padding: '15px 40px', borderRadius: '60px', fontWeight: '600', fontSize: '18px' } },

        'brands-section': {
          id: 'brands-section',
          type: 'container',
          content: '',
          style: { padding: '80px 100px', backgroundColor: '#FFF' },
          children: ['brands-header', 'brands-grid']
        },
        'brands-header': { id: 'brands-header', type: 'text', content: 'Explore Our Brands', style: { fontSize: '24px', fontWeight: '600', color: '#050B20', marginBottom: '30px' } },
        'brands-grid': {
          id: 'brands-grid',
          type: 'container',
          content: '',
          style: { display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '20px' },
          children: ['brand-1', 'brand-2', 'brand-3', 'brand-4', 'brand-5', 'brand-6', 'brand-7', 'brand-8', 'brand-9', 'brand-10', 'brand-11', 'brand-12']
        },
        'brand-1': { id: 'brand-1', type: 'text', content: 'Toyota', style: { backgroundColor: 'rgba(15,15,15,0.05)', borderRadius: '8px', padding: '40px 20px', textAlign: 'center', fontSize: '16px', fontWeight: '500' } },
        'brand-2': { id: 'brand-2', type: 'text', content: 'Ford', style: { backgroundColor: 'rgba(15,15,15,0.05)', borderRadius: '8px', padding: '40px 20px', textAlign: 'center', fontSize: '16px', fontWeight: '500' } },
        'brand-3': { id: 'brand-3', type: 'text', content: 'Tesla', style: { backgroundColor: 'rgba(15,15,15,0.05)', borderRadius: '8px', padding: '40px 20px', textAlign: 'center', fontSize: '16px', fontWeight: '500' } },
        'brand-4': { id: 'brand-4', type: 'text', content: 'Volkswagen', style: { backgroundColor: 'rgba(15,15,15,0.05)', borderRadius: '8px', padding: '40px 20px', textAlign: 'center', fontSize: '16px', fontWeight: '500' } },
        'brand-5': { id: 'brand-5', type: 'text', content: 'Honda', style: { backgroundColor: 'rgba(15,15,15,0.05)', borderRadius: '8px', padding: '40px 20px', textAlign: 'center', fontSize: '16px', fontWeight: '500' } },
        'brand-6': { id: 'brand-6', type: 'text', content: 'Nissan', style: { backgroundColor: 'rgba(15,15,15,0.05)', borderRadius: '8px', padding: '40px 20px', textAlign: 'center', fontSize: '16px', fontWeight: '500' } },
        'brand-7': { id: 'brand-7', type: 'text', content: 'Chevrolet', style: { backgroundColor: 'rgba(15,15,15,0.05)', borderRadius: '8px', padding: '40px 20px', textAlign: 'center', fontSize: '16px', fontWeight: '500' } },
        'brand-8': { id: 'brand-8', type: 'text', content: 'BMW', style: { backgroundColor: 'rgba(15,15,15,0.05)', borderRadius: '8px', padding: '40px 20px', textAlign: 'center', fontSize: '16px', fontWeight: '500' } },
        'brand-9': { id: 'brand-9', type: 'text', content: 'Mercedes-Benz', style: { backgroundColor: 'rgba(15,15,15,0.05)', borderRadius: '8px', padding: '40px 20px', textAlign: 'center', fontSize: '16px', fontWeight: '500' } },
        'brand-10': { id: 'brand-10', type: 'text', content: 'Hyundai', style: { backgroundColor: 'rgba(15,15,15,0.05)', borderRadius: '8px', padding: '40px 20px', textAlign: 'center', fontSize: '16px', fontWeight: '500' } },
        'brand-11': { id: 'brand-11', type: 'text', content: 'Audi', style: { backgroundColor: 'rgba(15,15,15,0.05)', borderRadius: '8px', padding: '40px 20px', textAlign: 'center', fontSize: '16px', fontWeight: '500' } },
        'brand-12': { id: 'brand-12', type: 'text', content: 'Kia', style: { backgroundColor: 'rgba(15,15,15,0.05)', borderRadius: '8px', padding: '40px 20px', textAlign: 'center', fontSize: '16px', fontWeight: '500' } },

        'meet-models-section': {
          id: 'meet-models-section',
          type: 'container',
          content: '',
          style: { padding: '80px 0', textAlign: 'center' },
          children: ['models-title', 'models-tabs', 'models-car-strip']
        },
        'models-title': { id: 'models-title', type: 'text', content: 'Meet the models', style: { fontSize: '42px', fontWeight: '600', marginBottom: '40px' } },
        'models-tabs': { id: 'models-tabs', type: 'text', content: 'SUV (12) | SEDAN (7) | HYBRID (17) | PERFORMANCE (9) | ALL (98)', style: { fontSize: '22px', fontWeight: '400', color: '#727272', marginBottom: '60px' } },
        'models-car-strip': {
           id: 'models-car-strip',
           type: 'container',
           content: '',
           style: { display: 'flex', gap: '40px', justifyContent: 'center', alignItems: 'center', overflowX: 'auto', padding: '0 40px' },
           children: ['car-1', 'car-2', 'car-3', 'car-4', 'car-5']
        },
        'car-1': { id: 'car-1', type: 'image', content: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=400', style: { width: '250px', height: '180px', borderRadius: '12px' } },
        'car-2': { id: 'car-2', type: 'image', content: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=400', style: { width: '350px', height: '250px', borderRadius: '12px' } },
        'car-3': { id: 'car-3', type: 'image', content: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600', style: { width: '450px', height: '320px', borderRadius: '12px' } },
        'car-4': { id: 'car-4', type: 'image', content: 'https://images.unsplash.com/photo-1542362567-b052d0b5eb57?auto=format&fit=crop&q=80&w=400', style: { width: '350px', height: '250px', borderRadius: '12px' } },
        'car-5': { id: 'car-5', type: 'image', content: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=400', style: { width: '250px', height: '180px', borderRadius: '12px' } },

        'exhilaration-grid-section': {
           id: 'exhilaration-grid-section',
           type: 'container',
           content: '',
           style: { backgroundColor: '#F9FAFB', padding: '100px 0' },
           children: ['exhilaration-header', 'exhilaration-grid']
        },
        'exhilaration-header': { id: 'exhilaration-header', type: 'text', content: 'Exhilaration Takes Many Forms', style: { fontSize: '42px', fontWeight: '600', textAlign: 'center', marginBottom: '80px' } },
        'exhilaration-grid': {
           id: 'exhilaration-grid',
           type: 'container',
           content: '',
           style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0px' },
           children: ['ex-1', 'ex-2', 'ex-3', 'ex-4']
        },
        'ex-1': { id: 'ex-1', type: 'image', content: 'https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?auto=format&fit=crop&q=80&w=800', style: { height: '391px' } },
        'ex-2': { id: 'ex-2', type: 'image', content: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800', style: { height: '391px' } },
        'ex-3': { id: 'ex-3', type: 'image', content: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800', style: { height: '391px' } },
        'ex-4': { id: 'ex-4', type: 'image', content: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800', style: { height: '391px' } },

        'safety-strip': {
           id: 'safety-strip',
           type: 'container',
           content: '',
           style: { backgroundColor: '#000', padding: '60px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '25px' },
           children: ['safety-text', 'safety-btn']
        },
        'safety-text': { id: 'safety-text', type: 'text', content: 'The 2026 Acura Lineup received the 2026 TOP SAFETY PICK rating by IIHS.', style: { fontSize: '28px', fontWeight: '400', color: '#FFF', maxWidth: '864px' } },
        'safety-btn': { id: 'safety-btn', type: 'button', content: 'SEE SAFETY RATINGS', style: { backgroundColor: '#FFF', color: '#000', padding: '16px 28px', borderRadius: '10px', fontSize: '18px', fontWeight: '600' } },

        'trade-in-section': {
           id: 'trade-in-section',
           type: 'container',
           content: '',
           style: { padding: '120px 100px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' },
           children: ['trade-in-bento', 'trade-in-img']
        },
        'trade-in-bento': {
           id: 'trade-in-bento',
           type: 'container',
           content: '',
           style: { display: 'flex', flexDirection: 'column', gap: '20px' },
           children: ['bento-1', 'bento-2', 'bento-3']
        },
        'bento-1': { id: 'bento-1', type: 'text', content: 'Wide Vehicle Selection\nExplore a diverse range of new and certified pre-owned vehicles to match every need.', style: { padding: '30px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '24px', fontSize: '20px' } },
        'bento-2': { id: 'bento-2', type: 'text', content: 'Expert Customer Support\nGet professional guidance from our team to help you make the right decision.', style: { padding: '30px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '24px', fontSize: '20px' } },
        'bento-3': { id: 'bento-3', type: 'text', content: 'Easy Trade-In Process\nUpgrade your vehicle effortlessly with a simple and fair trade-in evaluation.', style: { padding: '30px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '24px', fontSize: '20px' } },
        'trade-in-img': { id: 'trade-in-img', type: 'image', content: 'https://images.unsplash.com/photo-1562141989-c5c79ac8f576?auto=format&fit=crop&q=80&w=800', style: { borderRadius: '24px', height: '600px', objectFit: 'cover' } },

        'testimonials-section': {
           id: 'testimonials-section',
           type: 'container',
           content: '',
           style: { padding: '100px 60px', backgroundColor: '#FFF' },
           children: ['test-header', 'test-grid']
        },
        'test-header': { id: 'test-header', type: 'text', content: 'Testimonials\nReady to Find Your Next Vehicle?', style: { fontSize: '42px', fontWeight: '600', marginBottom: '60px', textAlign: 'center' } },
        'test-grid': {
           id: 'test-grid',
           type: 'container',
           content: '',
           style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' },
           children: ['card-1', 'card-2', 'card-3', 'card-4']
        },
        'card-1': { id: 'card-1', type: 'text', content: '★★★★★\nProfessional throughout. Everything was handled exactly as discussed.\n- Michael C.', style: { padding: '30px', border: '1px solid #EEE', borderRadius: '12px', fontSize: '14px' } },
        'card-2': { id: 'card-2', type: 'text', content: '★★★★★\nQuestions were answered quickly, process moved smoothly.\n- Daniel R.', style: { padding: '30px', border: '1px solid #EEE', borderRadius: '12px', fontSize: '14px' } },
        'card-3': { id: 'card-3', type: 'text', content: '★★★★★\nTeam was helpful without being pushy. Decision was easy.\n- Andrew S.', style: { padding: '30px', border: '1px solid #EEE', borderRadius: '12px', fontSize: '14px' } },
        'card-4': { id: 'card-4', type: 'text', content: '★★★★★\nAppreciated the transparency. Timelines were explained clearly.\n- Sarah L.', style: { padding: '30px', border: '1px solid #EEE', borderRadius: '12px', fontSize: '14px' } },

        'anniversary-section': {
           id: 'anniversary-section',
           type: 'container',
           content: '',
           style: { padding: '80px', display: 'flex', gap: '40px', justifyContent: 'center' },
           children: ['ann-1', 'ann-2']
        },
        'ann-1': { id: 'ann-1', type: 'image', content: 'https://images.unsplash.com/photo-1544636331-e268592033c2?auto=format&fit=crop&q=80&w=600', style: { width: '590px', height: '307px', borderRadius: '20px' } },
        'ann-2': { id: 'ann-2', type: 'image', content: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=600', style: { width: '590px', height: '307px', borderRadius: '20px' } },

        'footer-section': {
           id: 'footer-section',
           type: 'container',
           content: '',
           style: { backgroundColor: '#000', color: '#FFF', padding: '80px 100px' },
           children: ['footer-links', 'footer-bottom-v2']
        },
        'footer-links': {
           id: 'footer-links',
           type: 'container',
           content: '',
           style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '100px', marginBottom: '80px' },
           children: ['col-1', 'col-2', 'col-3']
        },
        'col-1': { id: 'col-1', type: 'text', content: 'Inventory\nNew Vehicles\nUsed Vehicles\nCertified Pre-Owned', style: { fontSize: '18px', lineHeight: '2' } },
        'col-2': { id: 'col-2', type: 'text', content: 'Finance\nPayment Calculator\nValue Trade-In\nCash for Car', style: { fontSize: '18px', lineHeight: '2' } },
        'col-3': { id: 'col-3', type: 'text', content: 'Service\nService Department\nSchedule Service\nGenuine Parts', style: { fontSize: '18px', lineHeight: '2' } },
        'footer-bottom-v2': { id: 'footer-bottom-v2', type: 'text', content: '© 2026 Acura Premium Dealer. All Rights Reserved.', style: { fontSize: '14px', opacity: 0.5, textAlign: 'center', borderTop: '1px solid #333', paddingTop: '40px' } }
      };
    }

    if (templateId === 'aces-elite') {
      return {
        'root': {
          id: 'root',
          type: 'container',
          content: '',
          style: { backgroundColor: '#050505', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif', color: '#FFFFFF' },
          children: ['nav-floating', 'hero-elite', 'features-bento', 'image-gallery-elite', 'footer-elite']
        },
        'nav-floating': {
          id: 'nav-floating',
          type: 'container',
          content: '',
          style: { position: 'fixed', top: '24px', left: '50%', transform: 'translateX(-50%)', width: '90%', maxWidth: '1200px', height: '72px', backgroundColor: 'rgba(15, 15, 15, 0.7)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '100px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', zIndex: '100' },
          children: ['nav-logo-elite', 'nav-links-elite', 'nav-btn-elite']
        },
        'nav-logo-elite': { id: 'nav-logo-elite', type: 'image', content: LOGO_URL, style: { height: '32px', filter: 'brightness(0) invert(1)' } },
        'nav-links-elite': { id: 'nav-links-elite', type: 'text', content: 'Collection • Design • Engineering • Bespoke', style: { color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontWeight: '600', gap: '32px', display: 'flex', textTransform: 'uppercase', letterSpacing: '0.2em' } },
        'nav-btn-elite': { id: 'nav-btn-elite', type: 'button', content: 'INQUIRE', style: { backgroundColor: '#FFFFFF', color: '#000', padding: '10px 24px', borderRadius: '40px', fontSize: '10px', fontWeight: '900', letterSpacing: '0.1em' } },
        
        'hero-elite': {
          id: 'hero-elite',
          type: 'container',
          content: '',
          style: { height: '100vh', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', overflow: 'hidden' },
          children: ['hero-bg-elite', 'hero-tag-elite', 'hero-title-elite', 'hero-sub-elite']
        },
        'hero-bg-elite': { id: 'hero-bg-elite', type: 'image', content: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2400', style: { position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6, zIndex: -1 } },
        'hero-tag-elite': { id: 'hero-tag-elite', type: 'text', content: 'EST. 2026', style: { fontSize: '12px', fontWeight: '900', letterSpacing: '0.5em', color: '#7047EB', marginBottom: '24px' } },
        'hero-title-elite': { id: 'hero-title-elite', type: 'text', content: 'BEYOND\nPRECISION.', style: { fontSize: '14vw', fontWeight: '900', lineHeight: '0.8', letterSpacing: '-0.06em', color: '#FFF' } },
        'hero-sub-elite': { id: 'hero-sub-elite', type: 'text', content: 'Redefining automotive excellence through meticulous engineering and uncompromising luxury.', style: { fontSize: '18px', fontWeight: '300', color: 'rgba(255,255,255,0.4)', maxWidth: '450px', marginTop: '40px', lineHeight: '1.6' } },

        'features-bento': {
          id: 'features-bento',
          type: 'container',
          content: '',
          style: { padding: '120px 60px', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px', maxWidth: '1440px', margin: '0 auto' },
          children: ['feat-1', 'feat-2', 'feat-3']
        },
        'feat-1': { id: 'feat-1', type: 'text', content: 'V12 Bi-Turbo\n750 Horsepower with instant torque delivery for an unrivaled driving dynamic.', style: { gridColumn: 'span 8', height: '400px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '40px', padding: '60px', fontSize: '24px', fontWeight: '300' } },
        'feat-2': { id: 'feat-2', type: 'image', content: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800', style: { gridColumn: 'span 4', height: '400px', borderRadius: '40px', objectFit: 'cover' } },
        'feat-3': { id: 'feat-3', type: 'text', content: 'Handcrafted Interior\nFinest Italian leather stitched with precision and surrounded by sustainable carbon fiber surfaces.', style: { gridColumn: 'span 12', height: '300px', backgroundColor: 'rgba(112, 71, 235, 0.05)', border: '1px solid rgba(112, 71, 235, 0.1)', borderRadius: '40px', padding: '60px', fontSize: '24px', fontWeight: '300', display: 'flex', alignItems: 'center' } },

        'image-gallery-elite': {
          id: 'image-gallery-elite',
          type: 'container',
          content: '',
          style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px', backgroundColor: '#000' },
          children: ['gal-1', 'gal-2', 'gal-3']
        },
        'gal-1': { id: 'gal-1', type: 'image', content: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800', style: { height: '600px', objectFit: 'cover' } },
        'gal-2': { id: 'gal-2', type: 'image', content: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800', style: { height: '600px', objectFit: 'cover' } },
        'gal-3': { id: 'gal-3', type: 'image', content: 'https://images.unsplash.com/photo-1542362567-b052d0b5eb57?auto=format&fit=crop&q=80&w=800', style: { height: '600px', objectFit: 'cover' } },

        'footer-elite': {
          id: 'footer-elite',
          type: 'container',
          content: '',
          style: { padding: '160px 60px', textAlign: 'center', backgroundColor: '#050505' },
          children: ['foot-tag', 'foot-title', 'foot-btns']
        },
        'foot-tag': { id: 'foot-tag', type: 'text', content: 'THE ELITE COLLECTION', style: { fontSize: '10px', fontWeight: '900', letterSpacing: '0.4em', color: '#727272', marginBottom: '32px' } },
        'foot-title': { id: 'foot-title', type: 'text', content: 'Drive the Revolution.', style: { fontSize: '80px', fontWeight: '700', letterSpacing: '-0.04em', marginBottom: '60px' } },
        'foot-btns': { id: 'foot-btns', type: 'text', content: 'Instagram • Twitter • LinkedIn • YouTube', style: { fontSize: '12px', fontWeight: '500', color: 'rgba(255,255,255,0.3)', gap: '40px', display: 'flex', justifyContent: 'center' } }
      };
    }

    if (templateId === 'route-23-honda') {
      return {
        'root': {
          id: 'root',
          type: 'container',
          content: '',
          style: { backgroundColor: '#020205', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif' },
          children: ['nav', 'hero', 'brand-selector', 'meet-models', 'exhilaration-grid', 'choose-us', 'testimonials', 'footer']
        },
        'nav': {
          id: 'nav',
          type: 'container',
          content: '',
          style: { backgroundColor: 'rgba(2, 2, 5, 0.8)', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 60px', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'sticky', top: '0', zIndex: '50', backdropFilter: 'blur(20px)' },
          children: ['nav-logo', 'nav-links', 'nav-cta']
        },
        'nav-logo': {
          id: 'nav-logo',
          type: 'image',
          content: LOGO_URL,
          style: { height: '64px', width: 'auto', filter: 'brightness(0) invert(1)' }
        },
        'nav-links': {
          id: 'nav-links',
          type: 'text',
          content: 'New Vehicles • Used Vehicles • Service • Offers • About',
          style: { color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontWeight: '600', gap: '32px', display: 'flex', textTransform: 'uppercase', letterSpacing: '0.15em' }
        },
        'nav-cta': {
          id: 'nav-cta',
          type: 'button',
          content: 'CONTACT US',
          style: { backgroundColor: '#0561FF', color: '#fff', padding: '12px 28px', borderRadius: '40px', fontSize: '10px', fontWeight: '900', letterSpacing: '0.1em', boxShadow: '0 10px 20px rgba(5, 97, 255, 0.2)' }
        },
        'hero': {
          id: 'hero',
          type: 'container',
          content: '',
          style: { minHeight: '900px', backgroundColor: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', textAlign: 'center', padding: '120px 20px', position: 'relative', overflow: 'hidden' },
          children: ['hero-aura', 'hero-tag', 'hero-title', 'hero-subtitle', 'hero-search']
        },
        'hero-aura': {
          id: 'hero-aura',
          type: 'container',
          content: '',
          style: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '600px', background: 'radial-gradient(circle, rgba(112, 71, 235, 0.15) 0%, transparent 70%)', filter: 'blur(120px)', zIndex: '0', pointerEvents: 'none' },
          children: []
        },
        'hero-tag': {
          id: 'hero-tag',
          type: 'text',
          content: 'Engineered for Performance • Driven by Intelligence',
          style: { color: '#7047EB', fontSize: '11px', fontWeight: '900', marginBottom: '32px', textTransform: 'uppercase', letterSpacing: '0.4em', position: 'relative', zIndex: '10' }
        },
        'hero-title': {
          id: 'hero-title',
          type: 'text',
          content: 'The Future of Motion.',
          style: { fontSize: '120px', fontWeight: '900', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '-0.05em', lineHeight: '0.85', fontFamily: 'Space Grotesk, sans-serif', position: 'relative', zIndex: '10' }
        },
        'hero-subtitle': {
          id: 'hero-subtitle',
          type: 'text',
          content: 'Experience the 2026 Honda lineup refined through the AcesAds AI synthesis. Precision acquisition meets world-class engineering.',
          style: { fontSize: '18px', fontWeight: '300', marginBottom: '60px', color: 'rgba(255,255,255,0.4)', maxWidth: '650px', lineHeight: '1.6', position: 'relative', zIndex: '10' }
        },
        'hero-search': {
          id: 'hero-search',
          type: 'container',
          content: '',
          style: { backgroundColor: 'rgba(255,255,255,0.02)', padding: '8px', borderRadius: '100px', display: 'flex', gap: '8px', width: '100%', maxWidth: '750px', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(40px)', position: 'relative', zIndex: '10' },
          children: ['search-input-1', 'search-input-2', 'search-btn']
        },
        'search-input-1': { id: 'search-input-1', type: 'text', content: 'Explore Models', style: { color: 'rgba(255,255,255,0.3)', fontSize: '13px', borderRight: '1px solid rgba(255,255,255,0.08)', padding: '15px 35px', flex: 1, fontWeight: '500', textAlign: 'left' } },
        'search-input-2': { id: 'search-input-2', type: 'text', content: 'Zip Code', style: { color: 'rgba(255,255,255,0.3)', fontSize: '13px', padding: '15px 35px', flex: 1, fontWeight: '500', textAlign: 'left' } },
        'search-btn': { id: 'search-btn', type: 'button', content: 'START YOUR JOURNEY', style: { backgroundColor: '#fff', color: '#000', borderRadius: '100px', padding: '15px 40px', fontWeight: '900', fontSize: '10px', letterSpacing: '0.15em' } },
        'brand-selector': {
          id: 'brand-selector',
          type: 'container',
          content: 'Explore Our Brands',
          style: { padding: '120px 60px', backgroundColor: '#020205', textAlign: 'center' },
          children: []
        },
        'meet-models': {
          id: 'meet-models',
          type: 'container',
          content: 'Meet the Models',
          style: { padding: '120px 60px', textAlign: 'center', backgroundColor: '#050508' },
          children: []
        },
        'exhilaration-grid': {
          id: 'exhilaration-grid',
          type: 'container',
          content: 'Exhilaration Takes Many Forms',
          style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', backgroundColor: 'rgba(255,255,255,0.02)' },
          children: []
        },
        'choose-us': {
          id: 'choose-us',
          type: 'container',
          content: 'Why Choose Us?',
          style: { padding: '120px 60px', backgroundColor: '#020205', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '60px' },
          children: []
        },
        'footer': {
          id: 'footer',
          type: 'container',
          content: '',
          style: { backgroundColor: '#000', color: '#fff', padding: '100px 60px', borderTop: '1px solid rgba(255,255,255,0.05)' },
          children: ['footer-top', 'footer-bottom']
        },
        'footer-top': { id: 'footer-top', type: 'text', content: 'Ready to Find Your Next Vehicle?', style: { fontSize: '42px', fontWeight: '700', marginBottom: '50px', fontFamily: 'Space Grotesk, sans-serif' } },
        'footer-bottom': { id: 'footer-bottom', type: 'text', content: '© 2026 Route 23 Honda. All Rights Reserved.', style: { fontSize: '11px', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: '0.1em' } }
      };
    }

    // Default template (Type R style)
    return {
      'root': {
        id: 'root',
        type: 'container',
        content: '',
        style: { display: 'flex', flexDirection: 'column' },
        children: ['nav', 'hero-section', 'wheel-section', 'footer']
      },
      'nav': {
        id: 'nav',
        type: 'container',
        content: '',
        style: { backgroundColor: 'black', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', borderBottom: '1px solid rgba(255,255,255,0.1)' },
        children: ['nav-logo', 'nav-links']
      },
      'nav-logo': { id: 'nav-logo', type: 'text', content: 'HONDA.', style: { color: 'white', fontWeight: '900', fontStyle: 'italic', fontSize: '40px' } },
      'nav-links': { id: 'nav-links', type: 'text', content: 'MODELS OFFERS SERVICE CONTACT', style: { color: '#888', fontSize: '10px', fontWeight: 'bold', gap: '20px', display: 'flex' } },
      'hero-section': {
        id: 'hero-section',
        type: 'container',
        content: '',
        style: { backgroundColor: 'black', padding: '100px 20px', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' },
        children: ['hero-title', 'hero-subtitle', 'hero-cta']
      },
      'hero-title': {
        id: 'hero-title',
        type: 'text',
        content: `NEW 2026 ${template.name.toUpperCase()}`,
        style: { color: 'white', fontSize: '72px', fontWeight: '900', marginBottom: '10px', textTransform: 'uppercase' }
      },
      'hero-subtitle': {
        id: 'hero-subtitle',
        type: 'text',
        content: 'Experience Superior Driving with the Latest USA Specifications.',
        style: { color: '#888', fontSize: '20px', fontWeight: '300', marginBottom: '40px' }
      },
      'hero-cta': {
        id: 'hero-cta',
        type: 'button',
        content: 'TEST DRIVE NOW',
        style: { backgroundColor: '#2563EB', color: 'white', padding: '15px 40px', borderRadius: '30px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }
      },
      'wheel-section': {
        id: 'wheel-section',
        type: 'container',
        content: '',
        style: { backgroundColor: 'black', padding: '80px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' },
        children: ['wheel-title', 'wheel-graphic']
      },
      'wheel-title': { id: 'wheel-title', type: 'text', content: 'Precision in Every Turn', style: { color: 'white', fontSize: '32px', fontWeight: '900', textAlign: 'center' } },
      'wheel-graphic': { id: 'wheel-graphic', type: 'container', content: '', style: { height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }, children: [] },
      'footer': { id: 'footer', type: 'text', content: '© 2026 Honda Automobile Dealer. Powered by AcesAds.', style: { backgroundColor: '#111', color: '#666', padding: '40px', textAlign: 'center', fontSize: '10px', fontWeight: 'bold' } }
    };
  };

  const [elements, setElements] = useState<Record<string, EditableElement>>({});
  const [history, setHistory] = useState<Record<string, EditableElement>[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [mediaLibrary, setMediaLibrary] = useState<string[]>([
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800'
  ]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(true);
  const [activeTool, setActiveTool] = useState('Add');

  useEffect(() => {
    const initial = getInitialElements(id || '');
    setElements(initial);
    setHistory([initial]);
    setHistoryIndex(0);
  }, [id, template.name]);

  const addToHistory = (newElements: Record<string, EditableElement>) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newElements);
    if (newHistory.length > 50) newHistory.shift();
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1];
      setElements(prev);
      setHistoryIndex(historyIndex - 1);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1];
      setElements(next);
      setHistoryIndex(historyIndex + 1);
    }
  };

  const updateElement = (id: string, updates: Partial<EditableElement>) => {
    const newElements = {
      ...elements,
      [id]: { ...elements[id], ...updates }
    };
    setElements(newElements);
    addToHistory(newElements);
  };

  const addElement = (type: 'image' | 'video', content: string) => {
    const elId = `${type}-${Date.now()}`;
    const newElement: EditableElement = {
      id: elId,
      type,
      content,
      style: type === 'image' ? { maxWidth: '100%', height: 'auto', margin: '20px auto', borderRadius: '12px' } : { margin: '20px auto' },
    };

    const root = elements['root'] || elements['hero-section'];
    if (!root) return;
    
    const newElements = {
      ...elements,
      [elId]: newElement,
      [root.id]: {
        ...root,
        children: [...(root.children || []), elId]
      }
    };

    setElements(newElements);
    addToHistory(newElements);
    setMediaLibrary(prev => Array.from(new Set([...prev, content])));
    setSelectedId(elId);
  };

  const handlePreview = () => {
    window.open(`/preview/${id}`, '_blank');
  };

  const handleDashboard = () => {
    navigate('/');
  };

  const handlePublish = () => {
    alert('Site published successfully! Access link generated.');
  };

  const deleteElement = (id: string) => {
    if (id === 'root') return;
    setElements(prev => {
      const newElements = { ...prev };
      delete newElements[id];
      // Remove from parents
      Object.keys(newElements).forEach(key => {
        if (newElements[key].children) {
          newElements[key].children = newElements[key].children!.filter(childId => childId !== id);
        }
      });
      addToHistory(newElements);
      return newElements;
    });
    setSelectedId(null);
  };

  const handleDragEnd = (id: string, deltaX: number, deltaY: number) => {
    // Basic position update simulation
    const el = elements[id];
    setElements(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        style: {
          ...prev[id].style,
          transform: `translate(${deltaX}px, ${deltaY}px)`
        }
      }
    }));
  };

  return (
    <div className="h-screen flex flex-col bg-aces-black text-white overflow-hidden font-sans select-none antialiased">
      <TopBar 
        templateName={template.name} 
        device={device} 
        setDevice={setDevice} 
        onUndo={undo}
        onRedo={redo}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        onPreview={handlePreview}
        onPublish={handlePublish}
        onDashboard={handleDashboard}
      />
      
      <div className="flex-1 flex overflow-hidden">
        <LeftPanel onAddMedia={addElement} activeTool={activeTool} onToolChange={setActiveTool} />
        
        <div className="flex-1 overflow-auto bg-[#050507] flex flex-col items-center p-12 scrollbar-hide relative transition-colors duration-700">
          {/* Landio Aura - Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[500px] landio-aura pointer-events-none"></div>
          
          <MainCanvas 
            elements={elements} 
            selectedId={selectedId} 
            setSelectedId={setSelectedId} 
            device={device}
            updateElement={updateElement}
            mediaLibrary={mediaLibrary}
            onAddMedia={addElement}
          />
        </div>
        
        <RightPanel 
          selectedId={selectedId} 
          elements={elements} 
          activeTool={activeTool}
          updateElement={updateElement}
          deleteElement={deleteElement}
          isAIPanelOpen={isAIPanelOpen}
          setIsAIPanelOpen={setIsAIPanelOpen}
          mediaLibrary={mediaLibrary}
          onAddMedia={addElement}
        />
      </div>
    </div>
  );
}
