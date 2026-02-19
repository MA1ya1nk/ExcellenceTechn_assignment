import React from 'react'

const Footer = () => {
    return (
        <div className='bg-[#0a1f1f]/90 border-b border-teal-900/50 text-white flex flex-col justify-center items-center  w-full h-16'>
            {/* <div className="logo font-bold text-white text-2xl">
                <span className='text-green-500'> &lt;</span>

                <span>Pass</span><span className='text-green-500'>OP/&gt;</span>


            </div> */}
            <div className='flex justify-center items-center'>
                Make you work easier with mayankprof@gmail.com
             {/* Created with <img className='w-7 mx-2' src="icons/heart.png" alt="" /> by CodeWithHarry */}
              </div>
        </div>
    )
}

export default Footer



// import React from 'react'

// const Footer = () => {
//   return (
//     <>
//       <style>{`
//         .footer-root {
//           background: rgba(10, 31, 31, 0.85);
//           backdrop-filter: blur(12px);
//           -webkit-backdrop-filter: blur(12px);
//           border-top: 1px solid rgba(0, 210, 150, 0.15);
//           color: white;
//           width: 100%;
//           padding: 32px 48px 24px;
//           position: relative;
//           overflow: hidden;
//           z-index: 10;
//         }
//         .footer-root::before {
//           content: '';
//           position: absolute;
//           top: 0; left: 10%; right: 10%;
//           height: 1px;
//           background: linear-gradient(90deg, transparent, #00d296, #00a8ff, transparent);
//         }
//         .footer-logo {
//           font-size: 22px;
//           font-weight: 800;
//           background: linear-gradient(135deg, #00d296, #00a8ff);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//           letter-spacing: -0.5px;
//         }
//         .footer-tagline {
//           font-size: 12px;
//           color: rgba(255,255,255,0.35);
//           margin-top: 4px;
//         }
//         .footer-link {
//           font-size: 13px;
//           color: rgba(255,255,255,0.45);
//           text-decoration: none;
//           transition: color 0.2s;
//         }
//         .footer-link:hover { color: #00d296; }
//         .footer-divider {
//           height: 1px;
//           background: rgba(255,255,255,0.07);
//           margin: 24px 0;
//         }
//         .footer-bottom {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           flex-wrap: wrap;
//           gap: 8px;
//         }
//         .footer-copy {
//           font-size: 12px;
//           color: rgba(255,255,255,0.25);
//         }
//         .footer-email {
//           font-size: 12px;
//           color: #00a8ff;
//           text-decoration: none;
//           font-weight: 500;
//           transition: color 0.2s;
//         }
//         .footer-email:hover { color: #00d296; }
//         .footer-badge {
//           font-size: 11px;
//           padding: 3px 10px;
//           border-radius: 99px;
//           border: 1px solid rgba(0,210,150,0.25);
//           color: rgba(0,210,150,0.7);
//           background: rgba(0,210,150,0.07);
//           letter-spacing: 0.5px;
//         }
//       `}</style>

//       <footer className="footer-root">

//         {/* Top Row */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

//           {/* Brand */}
//           <div>
//             <div className="footer-logo">✦ TodoApp</div>
//             <p className="footer-tagline">Making your work easier, one task at a time.</p>
//           </div>

//           {/* Links */}
//           <div className="flex gap-6">
//             <a href="/" className="footer-link">Home</a>
//             <a href="/todo" className="footer-link">Todos</a>
//             <a href="/signin" className="footer-link">Sign Up</a>
//             <a href="/dashboard" className="footer-link">Dashboard</a>
//           </div>

//           {/* Badge */}
//           <div className="footer-badge">🔐 Secured & Encrypted</div>

//         </div>

//         <div className="footer-divider" />

//         {/* Bottom Row */}
//         <div className="footer-bottom">
//           <p className="footer-copy">
//             © {new Date().getFullYear()} TodoApp. All rights reserved.
//           </p>
//           <p className="footer-copy">
//             Built with ❤️ by{" "}
//             <a href="mailto:mayankprof@gmail.com" className="footer-email">
//               mayankprof@gmail.com
//             </a>
//           </p>
//           <p className="footer-copy">
//             Fast · Secure · Multi-Device
//           </p>
//         </div>

//       </footer>
//     </>
//   )
// }

// export default Footer