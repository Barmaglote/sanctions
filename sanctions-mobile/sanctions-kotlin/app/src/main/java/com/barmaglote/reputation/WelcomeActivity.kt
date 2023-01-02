package com.barmaglote.reputation

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Button

class WelcomeActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val btnWelcome: Button = findViewById<Button>(R.id.welcome_button)
        btnWelcome.setOnClickListener(this::handleWelcomeEvent)
    }

    fun handleWelcomeEvent(view: View) {
        startActivity(Intent(this, NavalnyActivity::class.java))
    }
}