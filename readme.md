STUDENTCALCGLOBAL — COMPLETE WEBSITE DEPLOYMENT PACKAGE
=======================================================

This ZIP is the FULL website, not a patch. It contains the homepage, all existing calculators, the country grading directory, the CGPA/GPA calculators, articles, shared CSS/JavaScript, country data, sitemap, robots.txt, and images.

IMPORTANT BEFORE DEPLOYING
--------------------------
1. This package is for your EXISTING Netlify project named studentcalcglobal.
2. It uses your custom domain: https://studentcalcglobal.com
3. It is a static HTML/CSS/JavaScript website. No hosting purchase or build command is required.
4. Keep a copy of your currently deployed site as a backup.
5. Check the existing project's Deploys page. If the old operational-credit restriction is still active, Netlify may block a new production deploy until the restriction clears. Do not buy hosting because of this package.

DEPLOY TO THE EXISTING PROJECT
------------------------------
1. Sign in to the Netlify account/team that owns studentcalcglobal.
2. Open the existing studentcalcglobal project.
3. Click Deploys in the left menu.
4. On your computer, right-click this ZIP and choose “Extract All”.
5. Open the extracted folder named StudentCalcGlobal_Complete_Updated.
6. Confirm that you can see index.html, sitemap.xml, robots.txt, the assets folder, and the articles folder directly inside it.
7. Drag the StudentCalcGlobal_Complete_Updated folder into the manual deploy drop area on the existing project's Deploys page.
8. Wait for Netlify to show a successful production deploy.

IMPORTANT: Do not upload only one HTML file, only the assets folder, or a nested wrapper folder. Upload the extracted folder whose top level contains index.html. Netlify's existing-project drag-and-drop instructions require the ZIP to be extracted first. Avoid creating a new separate project from the general Netlify Drop page, because your custom domain is attached to the existing project.

AFTER DEPLOYMENT — CHECK THESE URLS
-----------------------------------
- https://studentcalcglobal.com/
- https://studentcalcglobal.com/country-grading-systems.html
- https://studentcalcglobal.com/cgpa-calculator.html
- https://studentcalcglobal.com/gpa-calculator.html
- https://studentcalcglobal.com/international-gpa-calculator.html
- https://studentcalcglobal.com/sitemap.xml

FUNCTIONAL TESTS
----------------
1. Country grading page: choose a country in the dropdown. Its details and guidance should appear. Click a country name in the directory; it should select that country and open the related CGPA panel.
2. Country CGPA panel: enter your institution's maximum GPA, at least one semester GPA, and that semester's credit hours. Click Calculate CGPA.
3. CGPA page: select a country if useful, enter the maximum scale from your transcript, add semester rows, enter GPAs and credits, and calculate.
4. GPA page: click “+ Add course”, enter course grade points and credit hours, then calculate.
5. International GPA page: click “+ Add course” and test calculation with grade points and credits on one consistent scale.
6. Test the remaining calculators and navigation links.

CALCULATION LIMITATIONS
-----------------------
- A credit-weighted GPA/CGPA is calculated as sum(GPA × credits) divided by sum(credits).
- Country information is a reference, not an official conversion for every university. Where national information is not verified or grading is institution-specific, the site tells the visitor to use their own institution's official scale.
- Do not convert raw marks/percentages to GPA with a simple ratio unless the institution publishes that conversion.
- The calculator does not automatically apply university-specific rules for repeated courses, transferred credits, failed courses, or excluded credits.

SEO NOTES
---------
- All 28 HTML pages use https://studentcalcglobal.com canonical URLs.
- sitemap.xml lists all included HTML pages under the custom domain.
- robots.txt points to the custom-domain sitemap.
- Keep the existing Google Search Console domain TXT verification record in Hostinger. Recheck https://studentcalcglobal.com/sitemap.xml in Search Console after a successful deployment if needed.
- Sitemap submission does not guarantee indexing, rankings, clicks, or AdSense approval.
