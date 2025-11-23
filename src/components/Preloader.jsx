import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Preloader.css';

const Preloader = () => {
  const preloaderRef = useRef(null);
  const logoRef = useRef(null);
  const svgRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Sequence timeline
      const tl = gsap.timeline();

      // Step 1: Logo animation
      tl.fromTo(logoRef.current, 
        {
          opacity: 0,
          scale: 0.5,
          rotation: -10
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: "back.out(1.7)"
        }
      )

      // Step 2: Hide logo and show SVG
      .to(logoRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        ease: "power2.in"
      })
      .set(logoRef.current, { display: 'none' })
      .set(svgRef.current, { display: 'flex' })
      .fromTo(svgRef.current, 
        {
          opacity: 0,
          scale: 0.8,
          rotationY: 90
        },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1,
          ease: "power3.out"
        }
      )

      // Step 3: Hide SVG and show text
      .to(svgRef.current, {
        opacity: 0,
        scale: 1.2,
        duration: 0.5,
        ease: "power2.in"
      })
      .set(svgRef.current, { display: 'none' })
      .set(textRef.current, { display: 'flex' })
      .fromTo(textRef.current, 
        {
          opacity: 0,
          y: 100,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "elastic.out(1, 0.5)"
        }
      )

      // Step 4: Hide entire preloader
      .to(preloaderRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          // Optional: Remove from DOM after animation
          if (preloaderRef.current) {
            preloaderRef.current.style.display = 'none';
          }
        }
      });

    }, preloaderRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="preloader" ref={preloaderRef}>
      {/* Step 1: Only Logo - Full Screen */}
      <div className="preloader__step preloader__step--logo" ref={logoRef}>
        <img 
          src="/logo.png" 
          alt="Zebro Kids Logo" 
          className="preloader__logo"
        />
      </div>

      {/* Step 2: Only SVG - Full Screen (initially hidden) */}
      <div className="preloader__step preloader__step--svg" ref={svgRef} style={{display: 'none'}}>
        <div className="preloader__animation">
          <svg 
            role="img" 
            aria-label="Mouth and eyes come from 9:00 and rotate clockwise into position, right eye blinks, then all parts rotate and merge into 3:00" 
            className="smiley" 
            viewBox="0 0 128 128" 
            width="128px" 
            height="128px"
          >
            <defs>
              <clipPath id="smiley-eyes">
                <circle className="smiley__eye1" cx="64" cy="64" r="8" transform="rotate(-40,64,64) translate(0,-56)" />
                <circle className="smiley__eye2" cx="64" cy="64" r="8" transform="rotate(40,64,64) translate(0,-56)" />
              </clipPath>
              <linearGradient id="smiley-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#000" />
                <stop offset="100%" stopColor="#fff" />
              </linearGradient>
              <mask id="smiley-mask">
                <rect x="0" y="0" width="128" height="128" fill="url(#smiley-grad)" />
              </mask>
            </defs>
            <g strokeLinecap="round" strokeWidth="12" strokeDasharray="175.93 351.86">
              <g>
                <rect fill="hsl(193,90%,50%)" width="128" height="64" clipPath="url(#smiley-eyes)" />
                <g fill="none" stroke="hsl(193,90%,50%)">
                  <circle className="smiley__mouth1" cx="64" cy="64" r="56" transform="rotate(180,64,64)" />
                  <circle className="smiley__mouth2" cx="64" cy="64" r="56" transform="rotate(0,64,64)" />
                </g>
              </g>
              <g mask="url(#smiley-mask)">
                <rect fill="hsl(223,90%,50%)" width="128" height="64" clipPath="url(#smiley-eyes)" />
                <g fill="none" stroke="hsl(223,90%,50%)">
                  <circle className="smiley__mouth1" cx="64" cy="64" r="56" transform="rotate(180,64,64)" />
                  <circle className="smiley__mouth2" cx="64" cy="64" r="56" transform="rotate(0,64,64)" />
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>

      {/* Step 3: Only Text - Full Screen (initially hidden) */}
      <div className="preloader__step preloader__step--text" ref={textRef} style={{display: 'none'}}>
        <div className="preloader__text">
          <h2 className="preloader__title">
            <span className="preloader-title-word preloader-title-word-1">Welcome</span>
            <span className="preloader-title-word preloader-title-word-2">To</span>
            <span className="preloader-title-word preloader-title-word-3">Zebro</span>
            <span className="preloader-title-word preloader-title-word-4">Kids</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Preloader;