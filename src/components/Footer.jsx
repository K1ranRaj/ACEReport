function Footer(){

  return (
    <footer className="mt-5 xl:mt-16 py-12 pb-0 border-t border-white/15">
      <div>
        <div className="grid grid-cols-1 grid-rows-1 gap-10 mb-4">

          <div className="flex flex-col items-center">
            <h3 className="text-lg font-bold text-white mb-3">ACEReport</h3>
            <p className="text-sm text-white/70 text-center w-[90%] lg:w-[60%] xl:w-[50%] ">Delivering real-time news from around the world to keep you informed on what's happening right now. Whether you're looking for the latest updates, breaking stories, or in-depth coverage, this platform brings you reliable information curated from trusted sources.</p>
          </div>

          <div className="flex flex-col items-center">
            <h4 className="font-semibold text-white mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="https://github.com/k1ranRaj" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-ace-violet flex items-center justify-center text-white transition-colors no-underline">
                <span className="text-base"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github-icon lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg></span>
              </a>
              <a href="https://www.linkedin.com/in/k1ranraj/" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-ace-cyan flex items-center justify-center text-white transition-colors no-underline">
                <span className="text-base"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin-icon lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg></span>
              </a>
              <a href="https://k1ranraj.vercel.app/" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-ace-cyan flex items-center justify-center text-white transition-colors no-underline">
                <span className="text-base"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link-icon lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 ">
          <div className="flex items-center justify-center">
            <p className="text-sm text-white/70">© 2025 ACEReport. All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
