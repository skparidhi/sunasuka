// Shared offer letter page. Each project page sets window.PROJECT before loading this file.
(function () {
  const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbzUBUAKldilxze7Qz8TS1p2Q-iuD6ZUokQmsABU2KG0RYoHPMBwE-mChPVvsUxTADtv/exec';
  const p = window.PROJECT;

  document.title = p.name;

  const header = `
    <header class="topbar">
      <div class="nav-shell">
        <a class="brand" href="index.html">
          <img src="img/logo.png" alt="Sunasuka logo" />
          <span>SUNASUKA</span>
        </a>
        <nav class="nav-links" aria-label="Primary navigation">
          <a href="index.html">Home</a>
          <a href="index.html#about">About Us</a>
          <a href="index.html#divisions">Divisions</a>
          <a href="index.html#why-us">Why Us</a>
        </nav>
        <a class="nav-button" href="tel:+917010022890">Contact Us</a>
      </div>
    </header>`;

  const details = p.details.concat([{ label: 'Geo-coordinates', value: p.coordsDisplay, sub: '' }])
    .map(d => `<div class="meta-item"><div class="k">${d.label}</div><div class="v">${d.value}<br><small class="meta-sub">${d.sub}</small></div></div>`)
    .join('');

  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(p.mapQuery)}&t=h&z=17&output=embed`;
  const mapView = p.fmbImage
    ? `
      <div class="inspector-nav">
        <div class="inspector-tabs">
          <button class="inspector-tab active" id="tab-fmb" type="button">FMB SKETCH</button>
          <button class="inspector-tab" id="tab-sat" type="button" style="font-weight:500;">Satellite & Topo View</button>
        </div>
      </div>
      <div id="wrapper-fmb" style="position: absolute; top: 62px; bottom: 0; left: 0; right: 0; display: flex; align-items: center; justify-content: center; background: #113e37; overflow: hidden;">
        <img src="${p.fmbImage}" alt="Cadastral blueprint" style="width: 100%; height: 100%; object-fit: cover; transform: scale(1.05);" />
      </div>
      <iframe id="iframe-sat" title="Satellite view of ${p.name}" src="${mapSrc}" style="position: absolute; top: 62px; width: 100%; height: calc(100% - 62px); display:none; border:0; z-index:1;" allowfullscreen="" loading="lazy"></iframe>`
    : `<iframe title="Satellite view of ${p.name}" src="${mapSrc}" style="position: absolute; inset: 0; width: 100%; height: 100%; border:0;" allowfullscreen="" loading="lazy"></iframe>`;

  const main = `
    <main class="page-shell">
      <br/><br/>
      <div class="breadcrumb">PROJECTS · ${p.name.toUpperCase()} · GENERATE OFFER LETTER</div>
      <h1 class="page-title">Offer Letter Generator</h1>
      <div class="page-sub">${p.name}</div>

      <div class="two-col">
        <section class="card">
          <div class="card-header">
            <div class="step-indicator">1</div>
            <div>
              <div class="card-title">Land & Property Details</div>
              <div class="card-subtitle">Direct cadastral registry sync • Geo-fenced perimeter</div>
            </div>
          </div>
          <div class="meta-grid">${details}</div>
          <div class="inspector-wrapper">${mapView}</div>
        </section>

        <aside class="card">
          <div class="card-header" style="padding-bottom:17px;">
            <div style="display:flex;align-items:center;gap:12px;">
              <div class="step-indicator">2</div>
              <div>
                <div class="card-title">Buyer KYC Form & Offer Price</div>
                <div class="card-subtitle">Legally binding particulars for title registration</div>
              </div>
            </div>
          </div>

          <form id="kyc-form" method="POST" action="${SHEETS_URL}">
            <input type="hidden" name="Project" value="${p.name}" />
            <div class="field">
              <label class="small" for="kyc-name">Primary applicant full name (as per AADHAAR / PAN)</label>
              <input name="Name" type="text" id="kyc-name" required />
            </div>
            <div style="display:flex;gap:16px;">
              <div style="flex:1;" class="field">
                <label class="small" for="kyc-email">Official email address</label>
                <input name="Email" type="email" id="kyc-email" required />
              </div>
              <div style="flex:1;" class="field">
                <label class="small" for="kyc-phone">Phone number</label>
                <input name="Mobile" type="text" id="kyc-phone" required />
              </div>
            </div>
            <div style="display:flex;gap:16px;">
              <div style="flex:1;" class="field">
                <label class="small" for="kyc-pan">PAN</label>
                <input name="PAN" type="text" id="kyc-pan" required />
              </div>
              <div style="flex:1;" class="field">
                <label class="small" for="kyc-entity">Legal entity type</label>
                <select name="Entity" id="kyc-entity">
                  <option>Individual (Resident Indian)</option>
                  <option>Individual (Non - Resident Indian)</option>
                  <option>Corporate</option>
                </select>
              </div>
            </div>
            <div class="field">
              <label class="small" for="kyc-address">Permanent Residential / Registration address</label>
              <textarea name="Address" rows="3" id="kyc-address" required></textarea>
            </div>
            <div class="field">
              <label class="small" for="kyc-price">Price OFFERED (PER ${p.priceUnit.toUpperCase()})</label>
              <input name="Price" type="text" id="kyc-price" required />
            </div>
            <div class="field">
              <label class="small" for="kyc-payment">Mode of Payment</label>
              <textarea name="Payment" rows="3" id="kyc-payment" required></textarea>
            </div>
            <div class="field">
              <label class="small" for="kyc-broker">REFERRER NAME</label>
              <input name="Broker" type="text" id="kyc-broker" />
            </div>

            <div style="margin-top:16px;padding-top:17px;border-top:1px solid rgba(208,197,175,0.3);">
              <label style="display:flex;gap:12px;align-items:flex-start;background:rgba(251,243,229,0.7);border:1px solid rgba(208,197,175,0.4);border-radius:16px;padding:15px;">
                <input type="checkbox" id="kyc-confirm" style="margin-top:3px;width:16px;height:16px;" required />
                <span style="font-size:12px;color:#4d4635;line-height:1.6;">I confirm that the applicant details match official legal identity records and authorize the generation of formal offer letter.</span>
              </label>
            </div>

            <div class="actions" style="flex-wrap: wrap;">
              <button class="btn-gold" id="btn-generate-pdf" style="flex:1;display:flex;justify-content:center;gap:8px;box-shadow:0 12px 14px rgba(212,175,55,0.35);font-size:16px;min-width: 200px;" type="submit">
                Generate Offer Letter
              </button>
            </div>
          </form>
        </aside>
      </div>
    </main>`;

  const footer = `
    <footer class="site-footer" style="margin-top:48px;">
      <div class="site-footer__inner">
        <div class="site-footer__top">
          <div class="footer-brand-block">
            <div class="footer-brand">
              <img src="img/logo.png" alt="Sunasuka logo" />
              <span>SUNASUKA</span>
            </div>
            <p>
              Pioneering eco-luxury real estate and sustainable energy solutions for a brighter,
              greener future.
            </p>
            <div class="footer-socials">
              <a href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" stroke-width="2" />
                  <circle cx="12" cy="12" r="3.5" stroke="currentColor" stroke-width="2" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M6.94 8.5A1.56 1.56 0 1 0 6.94 5.38a1.56 1.56 0 0 0 0 3.12ZM5.5 9.5h2.88V18H5.5zM10.9 9.5h2.76v1.16h.04c.38-.72 1.32-1.48 2.72-1.48 2.91 0 3.45 1.91 3.45 4.4V18h-2.88v-7.6c0-1.81-.03-4.14-2.52-4.14-2.53 0-2.92 1.97-2.92 4.01V18H10.9z" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>

          <div class="footer-column">
            <h3>Divisions</h3>
            <ul>
              <li>Farm Land Development</li>
              <li>Luxury Residences</li>
              <li>RERA Approved Layouts</li>
              <li>Solar EPC Projects</li>
            </ul>
          </div>

          <div class="footer-column">
            <h3>Company</h3>
            <ul>
              <li><a href="index.html#about">About Us</a></li>
              <li><a href="index.html#divisions">Divisions</a></li>
            </ul>
          </div>

          <div class="footer-column footer-column--signup">
            <h3>Stay Updated</h3>
            <p>Subscribe to our newsletter for exclusive property releases and company news.</p>
            <form class="footer-form">
              <input type="email" placeholder="Email address" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        <div class="site-footer__bottom">
          <p>© 2026 SUNASUKA Developers Pvt Ltd. All rights reserved.</p>
          <div class="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>`;

  document.body.insertAdjacentHTML('afterbegin', header + main + footer);

  if (p.fmbImage) {
    const tabFmb = document.getElementById('tab-fmb');
    const tabSat = document.getElementById('tab-sat');
    const wrapperFmb = document.getElementById('wrapper-fmb');
    const iframeSat = document.getElementById('iframe-sat');
    const showFmb = (on) => {
      tabFmb.classList.toggle('active', on);
      tabSat.classList.toggle('active', !on);
      tabFmb.style.fontWeight = on ? '' : '500';
      tabSat.style.fontWeight = on ? '500' : '';
      wrapperFmb.style.display = on ? 'flex' : 'none';
      iframeSat.style.display = on ? 'none' : 'block';
    };
    tabFmb.addEventListener('click', () => showFmb(true));
    tabSat.addEventListener('click', () => showFmb(false));
  }

  const kycForm = document.getElementById('kyc-form');
  const submitBtn = document.getElementById('btn-generate-pdf');

  kycForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(kycForm);

    submitBtn.innerText = 'Processing...';
    submitBtn.disabled = true;

    fetch(kycForm.action, { method: 'POST', body: formData })
      .then(response => response.json())
      .then(data => {
        if (data.result !== 'success') throw new Error(data.error || 'Unknown error');
        generateAndDownloadPDF();
        alert('Offer Letter Generated & Saved Successfully!');
      })
      .catch(error => {
        console.error('Error!', error.message);
        alert('There was an error saving your data. PDF will still be generated.');
        generateAndDownloadPDF();
      })
      .finally(() => {
        submitBtn.innerText = 'Generate Offer Letter';
        submitBtn.disabled = false;
      });
  });

  function generateAndDownloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const val = (id) => document.getElementById(id).value;

    const name = val('kyc-name');
    const address = val('kyc-address');
    const broker = val('kyc-broker') || 'N/A';
    const payment = val('kyc-payment').trim();

    doc.setFont('helvetica');
    doc.setFontSize(10);

    let y = 30;

    doc.text('From,', 20, y);
    doc.text(name, 20, y + 6);
    const fromAddr = doc.splitTextToSize(address, 80);
    doc.text(fromAddr, 20, y + 12);
    y += 12 + (fromAddr.length * 5) + 15;

    doc.text('To,', 20, y);
    doc.text('The CMD,', 20, y + 6);
    doc.text('SUNASUKA, THANJAVUR', 20, y + 12);
    y += 28;

    doc.text('Dear Sir,', 20, y);
    y += 12;
    doc.setFont('helvetica', 'bold');
    doc.text(doc.splitTextToSize(`Sub: Offer for ${p.name} - ${p.pdfSubject} - Reg`, 170), 20, y);
    doc.setFont('helvetica', 'normal');
    y += 14;

    const para = `We hereby offer a price of Rs. ${val('kyc-price')} /${p.priceUnit} for the land ${p.pdfLandDescription}. Our personal details are as follows:`;
    const splitText = doc.splitTextToSize(para, 170);
    doc.text(splitText, 20, y);
    y += (splitText.length * 5) + 8;

    const colX = 75;
    const row = (label, value) => {
      const lines = doc.splitTextToSize(value, 100);
      doc.text(label, 20, y);
      doc.text(':', colX, y);
      doc.text(lines, colX + 4, y);
      y += Math.max(8, lines.length * 5 + 3);
    };

    row('Name of the Person/Company', name);
    row('Mail Address', val('kyc-email'));
    row('Phone Number', val('kyc-phone'));
    row('PAN', val('kyc-pan'));
    row('Legal Entity Type', val('kyc-entity'));
    row('Address', address);
    row('Land referred by', broker);
    row('Mode of Payment', payment);

    y += 35;
    doc.text('Signature of Individual/Company authorised person', 20, y);

    doc.save(`Offer_Letter_${p.name.replace(/\s+/g, '_')}.pdf`);
  }
})();
