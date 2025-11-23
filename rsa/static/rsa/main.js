// rsa/static/rsa/main.js
function setInvalid(elem, yes) {
  elem.style.border = yes ? "2px solid red" : "";
}

async function postJSON(url, body) {
  const csrftoken = (function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  })('csrftoken');

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
    },
    body: JSON.stringify(body),
  });
  return res.json();
}

document.addEventListener("DOMContentLoaded", () => {
  const pInput = document.getElementById("p");
  const qInput = document.getElementById("q");
  const genBtn = document.getElementById("genBtn");
  const keyArea = document.getElementById("keyArea");
  const expArea = document.getElementById("expArea");
  const nVal = document.getElementById("nVal");
  const mVal = document.getElementById("mVal");
  const eVal = document.getElementById("eVal");
  const dVal = document.getElementById("dVal");
  const pubE = document.getElementById("pubE");
  const pubN = document.getElementById("pubN");
  const privD = document.getElementById("privD");
  const privN = document.getElementById("privN");
  const EInput = document.getElementById("E");
  const NInput = document.getElementById("N");
  const MInput = document.getElementById("M");
  const encBtn = document.getElementById("encBtn");
  const CVal = document.getElementById("CVal");
  const CInput = document.getElementById("C");
  const decBtn = document.getElementById("decBtn");
  const RVal = document.getElementById("RVal");

  genBtn.addEventListener("click", async () => {
    const p = Number(pInput.value);
    const q = Number(qInput.value);

    // basic client-side validation
    let bad = false;
    if (!p || p < 2 || p > MAX_INPUT) { setInvalid(pInput, true); bad = true; } else setInvalid(pInput, false);
    if (!q || q < 2 || q > MAX_INPUT) { setInvalid(qInput, true); bad = true; } else setInvalid(qInput, false);
    if (bad) return;

    // call server
    const data = await postJSON(RSA_GENERATE_URL, { p: p, q: q });
    if (data.error) {
      alert("Server error: " + data.error + "!");
      return;
    }
    keyArea.style.display = "block";
    nVal.innerText = data.n;
    mVal.innerText = data.m;
    eVal.innerText = data.e;
    dVal.innerText = data.d;
    pubE.innerText = data.e; pubN.innerText = data.n;
    privD.innerText = data.d; privN.innerText = data.n;

    EInput.value = eVal.textContent;
    NInput.value = nVal.textContent;
  });

  encBtn.addEventListener("click", async () => {
    const M = Number(MInput.value);
    const e = Number(EInput.value);
    const n = Number(NInput.value);
    if (!Number.isInteger(M) || M < 0 || Math.abs(M) > MAX_INPUT) { alert("Invalid message!"); return; }
    if (!e || !n) { alert("Generate keys first"); return; }
    const data = await postJSON(RSA_ENCRYPT_URL, { M: M, e: e, n: n });
    if (data.error) { alert("Server: " + data.error); return; }
    CVal.innerText = data.C;
    CInput.value = CVal.textContent;
  });

  decBtn.addEventListener("click", async () => {
    const C = Number(CInput.value);
    const d = Number(dVal.innerText);
    const n = Number(nVal.innerText);
    if (!Number.isInteger(C) || !d || !n) { alert("Encrypt first and/or generate keys!"); return; }
    const data = await postJSON(RSA_DECRYPT_URL, { C: C, d: d, n: n });
    if (data.error) { alert("Server: " + data.error); return; }
    RVal.innerText = data.R;
    expArea.style.display = "block";
    expArea.style.padding = "14px 18px";
    expArea.style.marginTop = "14px";
    expArea.style.border = "1px solid #d0d0d0";
    expArea.style.borderRadius = "8px";
    expArea.style.backgroundColor = "#f7f7f9";
    expArea.style.fontSize = "15px";
    expArea.style.lineHeight = "1.45";
    expArea.style.color = "#333";
    expArea.style.boxShadow = "0 2px 4px rgba(0,0,0,0.08)";
  });
});
