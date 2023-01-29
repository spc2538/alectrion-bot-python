import sys
import time
import pyautogui

def main():
    case_command = int(sys.argv[1])
    if (case_command == 1):
        first_case()
    elif (case_command == 2):
        second_case()
    elif (case_command == 3):
        third_case()
    else:
        test_case()


def first_case():
    open_vnc()
    change_service_workspace()
    click_taskbar()
    click_desktop_toggle()
    click_vpn_taskbar_icon()
    auth_vpn()
    close_vnc()
    print("All steps concluded first case")

def second_case():
    open_vnc()
    change_service_workspace()
    click_taskbar()
    click_desktop_toggle()
    click_vpn_taskbar_icon()
    click_vpn_placeholder()
    relog_vpn()
    auth_vpn()
    close_vnc()
    print("All steps concluded second case")

def third_case():
    open_vnc()
    change_service_workspace()
    click_taskbar()
    click_desktop_toggle()
    click_vpn_taskbar_icon()
    click_vpn_placeholder()
    relog_vpn_advanced()
    auth_vpn()
    close_vnc()
    print("All steps concluded third case")

def test_case():
    delay()
    pyautogui.click(18, 584)
    delay()
    pyautogui.click(18, 584)
    delay()
    pyautogui.click(773, 11)
    print("All steps concluded test case")

def open_vnc():
    delay()
    pyautogui.click(366, 745)
    delay()
    pyautogui.click(154, 202)
    pyautogui.click(154, 202)

def change_service_workspace():
    delay()
    pyautogui.click(894, 70)

def click_desktop_toggle():
    delay()
    with pyautogui.hold('super'): pyautogui.press('d')
    

def click_vpn_taskbar_icon():
    delay()
    pyautogui.click(142, 673)
    pyautogui.click(142, 673)

def click_taskbar():
    delay()
    pyautogui.click(476, 671)

def auth_vpn():
    delay()
    pyautogui.click(420, 389)
    delay()
    pyautogui.write('CriteriaJuancarlos', interval=0.15)
    delay()
    pyautogui.click(420, 409)
    delay()
    pyautogui.write('CriteriaJC260320$', interval=0.15)
    delay()
    pyautogui.click(420, 442)
    

def close_vnc():
    delay()
    pyautogui.click(993, 16)
    delay()
    pyautogui.click(930, 55)

def click_vpn_placeholder():
    delay()
    pyautogui.click(552, 296)

def relog_vpn():
    delay()
    pyautogui.click(355, 308)
    delay()
    pyautogui.click(355, 308)
    delay()
    delay()
    delay()

def relog_vpn_advanced():
    delay()
    pyautogui.click(355, 308)
    delay()
    delay()

def delay():
    time.sleep(1.5)

if __name__ == "__main__":
    main()
