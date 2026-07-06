/**
 * Google Apps Script — The Banker 2026 Webinar Registration Handler
 *
 * DEPLOYMENT INSTRUCTIONS
 * ───────────────────────
 * 1. Open https://script.google.com and create a NEW project (separate from the competition one).
 * 2. Paste all of this code into Code.gs
 * 3. Update the constants below:
 *      SHEET_ID        → the Google Spreadsheet ID for the WEBINAR sheet (from the URL)
 *      SHEET_NAME      → the tab/sheet name to write rows into (e.g. "Webinar")
 *      DRIVE_FOLDER_ID → a NEW Google Drive folder ID (can leave blank if not needed)
 * 4. Click "Deploy" → "New deployment" → Type: Web App
 *      Execute as: Me (your Google account)
 *      Who has access: Anyone
 * 5. Copy the Web App URL and add it as the environment variable:
 *      WEBINAR_GOOGLE_APPS_SCRIPT_URL=<paste URL here>
 *    in your Vercel project settings.
 */

// ─── CONFIG ────────────────────────────────────────────────────────────────
const SHEET_ID        = "YOUR_WEBINAR_SPREADSHEET_ID_HERE";
const SHEET_NAME      = "Webinar";
const DRIVE_FOLDER_ID = "YOUR_WEBINAR_DRIVE_FOLDER_ID_HERE";
// ────────────────────────────────────────────────────────────────────────────

const HEADERS = [
  "Thời gian",
  "Họ và tên",
  "Số điện thoại",
  "Email",
  "Link Facebook",
  "Trường đại học",
  "Năm học",
  "MSSV",
  "Lớp - Khóa - Chuyên ngành",
  "Minh chứng Like & Share bài post (links)",
  "Minh chứng Follow Fanpage (links)",
  "Câu hỏi cho diễn giả",
  "Lời nhắn cho BTC"
];

function doGet() {
  return ContentService.createTextOutput("OK").setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);
    ensureHeaders_();

    var ss    = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];
    var now   = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd/MM/yyyy HH:mm:ss");

    // proof_post_urls and proof_fanpage_urls are arrays of public Supabase URLs
    // passed directly from the webinar API after files have been verified in Supabase.
    var postLinks    = (payload.proof_post_urls    || []).join("\n");
    var fanpageLinks = (payload.proof_fanpage_urls || []).join("\n");

    var row = [
      now,
      payload.full_name           || "",
      payload.phone               || "",
      payload.email               || "",
      payload.facebook_url        || "",
      payload.university          || "",
      payload.year                || "",
      payload.student_id          || "",
      payload.class_info          || "",
      postLinks,
      fanpageLinks,
      payload.speaker_question    || "",
      payload.organizer_message   || ""
    ];

    sheet.appendRow(row);

    return buildJsonResponse_({ status: "ok", message: "Đăng ký webinar thành công." });
  } catch (err) {
    return buildJsonResponse_({ status: "error", message: err.toString() });
  }
}

function ensureHeaders_() {
  try {
    var ss    = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length)
        .setFontWeight("bold")
        .setBackground("#0B1F3A")
        .setFontColor("#FFFFFF");
      sheet.setFrozenRows(1);
    }
  } catch (e) {
    Logger.log("ensureHeaders_ error: " + e);
  }
}

function buildJsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
