import os
import sys
import django
from django.conf import settings
from django.core.mail import send_mail
import urllib.request
import urllib.error
import json

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'volunteer_platform.settings')
try:
    django.setup()
except Exception as e:
    print(f"❌ Django Setup Error: {e}")
    sys.exit(1)

def diagnose():
    print("--- 🔍 SendGrid Diagnostic Tool (PythonAnywhere) ---")

    # 1. Check Environment Variables
    api_key = os.getenv("SENDGRID_API_KEY")
    from_email = os.getenv("DEFAULT_FROM_EMAIL")

    if not api_key:
        print("❌ ERROR: SENDGRID_API_KEY is not set in the environment.")
    else:
        key_preview = api_key[:10] if api_key else "None"
        print(f"✅ SENDGRID_API_KEY found (starts with: {key_preview}...)")

    if not from_email:
        print("❌ ERROR: DEFAULT_FROM_EMAIL is not set in the environment.")
    else:
        print(f"✅ DEFAULT_FROM_EMAIL found: {from_email}")

    # 2. Check Connectivity (PythonAnywhere Whitelist)
    print("\n🌐 Testing connectivity to api.sendgrid.com via HTTPS...")
    if api_key:
        try:
            req = urllib.request.Request(
                "https://api.sendgrid.com/v3/scopes",
                headers={"Authorization": f"Bearer {api_key}"}
            )
            with urllib.request.urlopen(req) as response:
                if response.status == 200:
                    print("✅ Connectivity to SendGrid API is functional.")
                else:
                    print(f"❌ API connectivity failed (Status Code: {response.status})")
        except urllib.error.HTTPError as e:
            print(f"❌ API HTTP Error: {e.code} {e.reason}")
            try:
                print(f"Response Body: {e.read().decode()}")
            except:
                pass
        except Exception as e:
            print(f"❌ Connectivity Error: {e}")
            print("💡 TIP: On PythonAnywhere Free accounts, only whitelisted domains over HTTPS are allowed.")

    # 3. Test Django Email Backend
    print("\n📧 Testing Django 'send_mail' through SendGrid backend...")
    if api_key and from_email:
        try:
            # We use the from_email as recipient for the test
            send_mail(
                subject='SendGrid Diagnostic Test',
                message='This is a diagnostic test from PythonAnywhere.',
                from_email=from_email,
                recipient_list=[from_email],
                fail_silently=False,
            )
            print("✅ Django 'send_mail' reported success!")
        except Exception as e:
            print(f"❌ Django Email Error: {e}")
            print("\nPossible Causes:")
            print("- API Key is invalid or lacks 'Mail Send' permissions.")
            print("- Sender address is not verified in the SendGrid Dashboard.")
            print("- PythonAnywhere firewall blocking (if not using HTTPS).")

if __name__ == "__main__":
    diagnose()
