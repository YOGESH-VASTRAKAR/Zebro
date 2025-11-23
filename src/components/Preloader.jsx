import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Preloader.css';

const Preloader = () => {
  const preloaderRef = useRef(null);
  const sectionsRef = useRef([]);
  const outerWrappersRef = useRef([]);
  const innerWrappersRef = useRef([]);
  const currentIndex = useRef(-1);
  const animating = useRef(false);

  // Add refs to arrays
  const addToRefs = (el, refArray) => {
    if (el && !refArray.current.includes(el)) {
      refArray.current.push(el);
    }
  };

  useEffect(() => {
    const sections = sectionsRef.current;
    const outerWrappers = outerWrappersRef.current;
    const innerWrappers = innerWrappersRef.current;

    // Initialize animations
    gsap.set(outerWrappers, { yPercent: 100 });
    gsap.set(innerWrappers, { yPercent: -100 });
    gsap.set(sections, { autoAlpha: 0 });

    const gotoSection = (index, direction) => {
      if (animating.current) return;
      
      animating.current = true;
      const fromTop = direction === -1;
      const dFactor = fromTop ? -1 : 1;

      const tl = gsap.timeline({
        defaults: { duration: 1.2, ease: "power2.inOut" },
        onComplete: () => {
          animating.current = false;
          
          // If it's the last section, hide preloader
          if (index === sections.length - 1) {
            setTimeout(() => {
              gsap.to(preloaderRef.current, {
                opacity: 0,
                duration: 0.8,
                onComplete: () => {
                  if (preloaderRef.current) {
                    preloaderRef.current.style.display = 'none';
                  }
                }
              });
            }, 1500);
          }
        }
      });

      // Hide current section
      if (currentIndex.current >= 0) {
        gsap.set(sections[currentIndex.current], { zIndex: 0 });
        tl.to(sections[currentIndex.current], { autoAlpha: 0 }, 0);
      }

      // Show new section
      gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
      
      tl.fromTo([outerWrappers[index], innerWrappers[index]], 
        { 
          yPercent: i => i ? -100 * dFactor : 100 * dFactor 
        },
        { 
          yPercent: 0 
        }, 0
      );

      currentIndex.current = index;
    };

    // Auto-advance through sections
    const autoAdvance = () => {
      let index = 0;
      const totalSections = sections.length;
      
      const nextSection = () => {
        if (index < totalSections) {
          gotoSection(index, 1);
          index++;
          if (index < totalSections) {
            setTimeout(nextSection, 2000); // 2 second delay between sections
          }
        }
      };
      
      // Start with first section
      setTimeout(() => {
        gotoSection(0, 1);
        index = 1;
        setTimeout(nextSection, 2000);
      }, 500);
    };

    autoAdvance();

    return () => {
      // Cleanup
      animating.current = false;
    };
  }, []);

  return (
    <div className="preloader" ref={preloaderRef}>
      {/* Section 1: Logo */}
      <section 
        className="preloader-section section-logo" 
        ref={el => addToRefs(el, sectionsRef)}
      >
        <div 
          className="outer" 
          ref={el => addToRefs(el, outerWrappersRef)}
        >
          <div 
            className="inner" 
            ref={el => addToRefs(el, innerWrappersRef)}
          >
            <div className="bg logo-bg">
              <div className="content">
                <img 
                  src="/logo.png" 
                  alt="Zebro Kids Logo" 
                  className="preloader__logo"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: SVG Animation */}
      <section 
        className="preloader-section section-svg" 
        ref={el => addToRefs(el, sectionsRef)}
      >
        <div 
          className="outer" 
          ref={el => addToRefs(el, outerWrappersRef)}
        >
          <div 
            className="inner" 
            ref={el => addToRefs(el, innerWrappersRef)}
          >
            <div className="bg svg-bg">
              <div className="content">
                <div className="preloader__animation">
                  <svg 
                    role="img" 
                    aria-label="Animated smiley face" 
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
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Text */}
      <section 
        className="preloader-section section-text" 
        ref={el => addToRefs(el, sectionsRef)}
      >
        <div 
          className="outer" 
          ref={el => addToRefs(el, outerWrappersRef)}
        >
          <div 
            className="inner" 
            ref={el => addToRefs(el, innerWrappersRef)}
          >
            <div className="bg text-bg">
              <div className="content">
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default Preloader;